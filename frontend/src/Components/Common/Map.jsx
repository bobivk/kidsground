import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../static/stylesheets/map.css';
import { ReactComponent as Terrain } from "../../static/icons/layers_8.svg";
import { ReactComponent as Location } from "../../static/icons/location.svg";
import { ReactComponent as Legend } from "../../static/icons/legend.svg";

const libraries = ['places'];


export const Map = ({ onCoordinatesChange, currentPlaygroundCords }) => {
    const [marker, setMarker] = useState(null);
    const [map, setMap] = useState(null);
    const [markersLoaded, setMarkersLoaded] = useState(false);
    const [selectedMapType, setSelectedMapType] = useState('roadmap');
    const [playgrounds, setPlaygrounds] = useState([]);
    const [currentPosition, setCurrentPosition] = useState({});
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [requestDirections, setRequestDirections] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(17);
    const [showLegend, setShowLegend] = useState(false);
    const infoBoxRef = useRef();

    const onMapLoad = (map) => {
        setMap(map);
    };

    const getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                error => {
                    console.error('Error getting current position:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const showCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                var currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                const newMarker = new window.google.maps.Marker({
                    position: currentLocation,
                    title: "Your Location",
                    draggable: true // Ensure the marker is draggable
                });
                onCoordinatesChange(currentLocation);
                setMarker(newMarker);

                map.panTo(currentLocation);
            }, error => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation. Please enable location services for this site in your browser settings.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("An unknown error occurred.");
                        break;
                    default:
                        alert("Unknown issue");
                }
            });
        }
    };

    const handleMove = (event) => {
        const newMarker = new window.google.maps.Marker({
            position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            title: "Your Location",
            draggable: true // Ensure the marker is draggable
        });
        setMarker(newMarker);
        onCoordinatesChange({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    };

    const showDetails = (playground) => {
        setSelectedMarker(playground);
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const handleMapTypeChange = () => {
        if (map) {
            if (map.getMapTypeId() === 'roadmap') {
                map.setMapTypeId('satellite');
                setSelectedMapType('satellite');
            } else {
                map.setMapTypeId('roadmap');
                setSelectedMapType('roadmap');
            }
        }
    };

    const handleLegendHover = () => {
        setShowLegend(true);
    }

    const setTitle = () => {
        const infoWindowElement = document.querySelector('.gm-style-iw-ch');
        if (infoWindowElement) {
            infoWindowElement.innerHTML = `<h4 style="position:relative; top:-20px">${selectedMarker.name}</h4>`;
        }
    };

    const changeTitle = () => {
        const infoWindowElement = document.querySelector('.gm-style-iw-ch');
        if (infoWindowElement) {
            infoWindowElement.innerHTML = `<h4 style="position:relative; top:-20px">${selectedMarker.name}</h4>`;
        }
    };

    const [mapContainerStyle, setMapContainerStyle] = useState({
        width: '70vw',
        height: '70vh',
    });

    const handleDirectionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDirectionsResponse(response);
                setRequestDirections(false);
            } else {
                console.log('response: ', response);
            }
        }
    };

    const fetchData = async () => {
        const receivedItems = await fetch("https://kidsground.bg:8009/v1/playgrounds/all");
        const receivedItemsJSON = await receivedItems.json();
        console.log(receivedItemsJSON[0].age_group);
        setPlaygrounds(receivedItemsJSON);
    };

    useEffect(() => {
        getCurrentPosition();
        setMarkersLoaded(true);
        const handleResize = () => {
            if (window.innerWidth <= 1280) {
                setMapContainerStyle({
                    width: '100vw',
                    height: '50vh',
                });
            } else {
                setMapContainerStyle({
                    width: '70vw',
                    height: '70vh',
                });
            }
            if (map) {
                window.google.maps.event.trigger(map, 'resize');
                if (!marker) {
                    fetchData();
                    showCurrentLocation();
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [map]);

    useEffect(() => {
        if (map) {
            const zoomChangedListener = map.addListener('zoom_changed', () => {
                const newZoomLevel = map.getZoom();
                setZoomLevel(newZoomLevel);
            });

            return () => {
                window.google.maps.event.removeListener(zoomChangedListener);
            };
        }
    }, [map]);

    const getIconSize = (zoom) => {
        const baseSize = 32;
        const scaleFactor = zoom / 17; // Adjust the scale factor as needed
        const size = baseSize * scaleFactor;
        return new window.google.maps.Size(size, size);
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div id="google-map">
            <Terrain id="terrain" onClick={handleMapTypeChange} />
            <GoogleMap
                options={{ controlSize: 0, gestureHandling: "greedy" }}
                mapContainerStyle={mapContainerStyle}
                zoom={zoomLevel}
                center={currentPlaygroundCords ? currentPlaygroundCords : currentPosition}
                onLoad={onMapLoad}
            >
                {playgrounds && playgrounds.map((playground) => (
                    <Marker
                        onClick={() => { showDetails(playground); }}
                        key={playground.id}
                        icon={{
                            url: (require(`../../static/${playground.age_group}.png`)),
                            scaledSize: getIconSize(zoomLevel)
                        }}
                        position={new window.google.maps.LatLng(playground.coordinates)}
                    />
                ))}
                {selectedMarker &&
                    <InfoWindow
                        onDomReady={setTitle}
                        onPositionChanged={changeTitle}
                        options={{ ariaLabel: selectedMarker.id + selectedMarker.ageGroup, pixelOffset: new window.google.maps.Size(0, -25) }}
                        onCloseClick={() => { setSelectedMarker(null); }}
                        position={new window.google.maps.LatLng(selectedMarker.coordinates)}
                    >
                        <div id="infoWindow">
                            {selectedMarker.image_links[0] && <img src={selectedMarker.image_links[0]} alt="playground_photo" height="50px" style={{ marginTop: "20px" }} />}
                            <p>{selectedMarker.description}</p>
                            <Link to={`/playground/${selectedMarker.id}`}><a>Виж Повече</a></Link>
                        </div>
                    </InfoWindow>
                }
                {marker && <Marker onDrag={handleMove} draggable={true} icon={{
                    url: (require("../../static/user_location.png")),
                    scaledSize: getIconSize(zoomLevel)
                }} position={marker.position} />}
                {currentPlaygroundCords && <Marker icon={{
                    url: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
                    scaledSize: getIconSize(zoomLevel)
                }} position={new window.google.maps.LatLng(currentPlaygroundCords)} />}
                {currentPlaygroundCords && requestDirections && <DirectionsService options={{
                    destination: currentPlaygroundCords,
                    origin: currentPosition,
                    travelMode: 'WALKING'
                }} callback={handleDirectionsCallback} />}
                {directionsResponse && <DirectionsRenderer options={{
                    directions: directionsResponse,
                    suppressMarkers: true
                }} />}
                {showLegend &&
                    <div id="legend-window">
                        <p>Легенда</p>
                        <div className='legend-row'>
                            <img height="35px" src='user_location.png' alt='user_location'/>
                            <p>Моята локация</p>
                        </div>
                        <div className='legend-row'>
                            <img src='zero_to_three.png' alt='zero_to_three' />
                            <p>За деца от 0 до 3 години</p>
                        </div>
                        <div className='legend-row'>
                            <img src='three_to_six.png' alt='three_to_six.png'/>
                            <p>За деца от 3 до 6 години</p>
                        </div>
                        <div className='legend-row'>
                            <img src='three_to_twelve.png' alt='three_to_twelve'/>
                            <p>За деца от 3 до 12 години</p>
                        </div >
                        <div className='legend-row'>
                            <img src='six_to_twelve.png' alt='six_to_twelve' />
                            <p>За деца от 6 до 12 години</p>
                        </div>
                    </div>}
            </GoogleMap>
            <Location onClick={showCurrentLocation} id="location" />
            <Legend onMouseOver={handleLegendHover} onMouseLeave={() => setShowLegend(false)} id="legend" />
            
        </div>
    );
};
