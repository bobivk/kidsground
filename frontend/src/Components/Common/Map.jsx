import { GoogleMap, useLoadScript, Marker, InfoBox, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../static/stylesheets/map.css'
import {ReactComponent as Terrain} from "../../static/icons/layers_8.svg"
import {ReactComponent as Location} from "../../static/icons/location.svg"

const libraries = ['places'];

const plovdiv = {lat: 42.1354, lng:24.7453};

export const Map = ({onCoordinatesChange}) => {

    const [marker, setMarker] = useState(null);
    const [map, setMap] = useState(null);
    const [markersLoaded, setMarkersLoaded] = useState(false)
    const [selectedMapType, setSelectedMapType] = useState('roadmap');
    const [playgrounds, setPlaygrounds] = useState([])
    const [currentPosition, setCurrentPosition] = useState({})
    const [selectedMarker, setSelectedMarker] = useState()
    const [AdvancedMarkerElement, setAdvancedMarkerElement] = useState()
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
    }

    const showCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (position) => {
                var currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                const newMarker = new window.google.maps.Marker({
                    position: currentLocation,
                    title: "Your Location",
                    draggable: true // Ensure the marker is draggable
                })
                onCoordinatesChange(currentLocation);
                setMarker(newMarker);
                    
                map.panTo(currentLocation);
            }, (error) => {
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
            })
        }
    }

    const handleMove = (event) => {
        const newMarker = new window.google.maps.Marker({
            position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
            title: "Your Location",
            draggable: true // Ensure the marker is draggable
        })
        setMarker(newMarker);
        onCoordinatesChange({lat: event.latLng.lat(), lng: event.latLng.lng()});
    }

    const showDetails = (playground) => {
        setSelectedMarker(playground);
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAbVV04b50sVLWUYtMDVfEIuPnoFPU_mas',
        libraries,
    });

    const handleMapTypeChange = () => {
        if (map) {
            if(map.getMapTypeId() === 'roadmap') {
                map.setMapTypeId('satellite');
                setSelectedMapType('satellite');
            } else {
                map.setMapTypeId('roadmap');
                setSelectedMapType('roadmap');
            }
        }
    }

    const setTitle = () => {
        const infoWindowElement = document.querySelector('.gm-style-iw-ch');
        if (infoWindowElement) {
            // Create a new title element
            infoWindowElement.innerHTML = `<h4 style="position:relative; top:-20px">${selectedMarker.name}</h4>`;
        } 
    }

    const changeTitle = () => {
        const infoWindowElement = document.querySelector('.gm-style-iw-ch');
        if (infoWindowElement) {
            // Create a new title element
            infoWindowElement.innerHTML = `<h4 style="position:relative; top:-20px">${selectedMarker.name}</h4>`;
        } 
    }

    const [mapContainerStyle, setMapContainerStyle] = useState({
        width: '70vw',
        height: '70vh',
        // controlSize: '200px'
      });

    const fetchData = async () => {
        setPlaygrounds([{id:1, name: "bla, bla", ageGroup: "three_to_six", coordinates: {lat: 41.6338, lng: 25.3777}}, {id:2, name: "bla, bla2", ageGroup: "three_to_six", coordinates: {lat: 41.6368, lng: 25.3777}}])
        // const receivedItems = await fetch("http://kidsground.bg:8009/v1/playgrounds/all")
        // const receivedItemsJSON = await receivedItems.json()
        // setPlaygrounds(receivedItemsJSON)
    }

      useEffect(() => {

        console.log(selectedMarker);
        getCurrentPosition();
        setMarkersLoaded(true);
        const handleResize = () => {
          // Update mapContainerStyle based on screen size
          if (window.innerWidth <= 1280) {
            setMapContainerStyle({
              width: '100vw',
              height: '50vh', // Adjust the height as needed for smaller screens
            //   controlSize: '200px'
            });
          } else {
            setMapContainerStyle({
                width: '70vw',
                height: '70vh',
                // controlSize: '200px'
            });
          }
          if (map) {
            window.google.maps.event.trigger(map, 'resize');
            
            if(!marker) {
                fetchData();
                showCurrentLocation()
                // window.google.maps.Marker.addEventListener(Marker, 'click', () => {
                //     setSelectedMarker(null);
                // })
            }
          }
          
        };
    
        // Initial setup
        handleResize();
    
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [map])

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
                options={{controlSize: 0, gestureHandling: "greedy"}}
                mapContainerStyle={mapContainerStyle}
                zoom={17}
                center={currentPosition}
                onLoad={onMapLoad}
                // onClick={handleClick}
            >
                {playgrounds.map((playground) => (
                    <Marker
                        onClick={() => {showDetails(playground)}}
                        key={playground.id}
                        icon = {{
                            url: (require(`../../static/${playground.ageGroup}.png`)),
                            scaledSize: new window.google.maps.Size(32, 32)
                        }}
                        position={new window.google.maps.LatLng(playground.coordinates)}
                    > 
                    </Marker>))}
                    {selectedMarker &&
                            <InfoWindow
                                onDomReady={setTitle}
                                onPositionChanged={changeTitle}
                                options={{ ariaLabel: selectedMarker.id + selectedMarker.ageGroup, pixelOffset: new window.google.maps.Size(0, -25) }}
                                onCloseClick={() => {setSelectedMarker(null)}}
                                position={new window.google.maps.LatLng(selectedMarker.coordinates)}
                            >
                                <div id="infoWindow">
                                    <p>Details about this playground</p>
                                    <Link to="/playground"><a>Виж Повече</a></Link>
                                </div>
                            </InfoWindow>
                    }
                {marker && <Marker onDrag={handleMove} draggable={true} icon= {{
                            url: (require("../../static/user_location.png")),
                            scaledSize: new window.google.maps.Size(32, 32)
                        }} position={marker.position} />}
            </GoogleMap>
            <Location onClick={showCurrentLocation} id="location"/>
        </div>
    );
};