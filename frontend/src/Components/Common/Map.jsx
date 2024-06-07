import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
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
    };

    const [mapContainerStyle, setMapContainerStyle] = useState({
        width: '70vw',
        height: '70vh',
        // controlSize: '200px'
      });

    
    const fetchData = async () => {
        // const receivedItems = await fetch("http://3.79.99.23:8009/v1/playgrounds/all")
        // const receivedItemsJSON = await receivedItems.json()
        // setPlaygrounds(receivedItemsJSON)
    }

      useEffect(() => {

        fetchData();
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
                showCurrentLocation()
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
      }, [playgrounds, map, marker])

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
                options={{controlSize: 0}}
                mapContainerStyle={mapContainerStyle}
                zoom={17}
                center={currentPosition}
                onLoad={onMapLoad}
            >
                {playgrounds.map((playground) => (
                    <Marker 
                        key={playground.id}
                        icon = {{
                            url: (require(`../../static/${playground.ageGroup}.png`)),
                            scaledSize: new window.google.maps.Size(32, 32)
                        }}
                        position={playground.coordinates}
                    />))}
                {marker && <Marker onDrag={handleMove} draggable={true} icon= {{
                            url: (require("../../static/user_location.png")),
                            scaledSize: new window.google.maps.Size(32, 32)
                        }} position={marker.position} />}
            </GoogleMap>
            <Location onClick={showCurrentLocation} id="location"/>
        </div>
    );
};