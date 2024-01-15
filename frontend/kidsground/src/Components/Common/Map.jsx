import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import '../../static/stylesheets/map.css'

const libraries = ['places'];

const plovdiv = {lat: 42.1354, lng:24.7453};

export const Map = () => {

    const [marker, setMarker] = useState(null);
    const [map, setMap] = useState(null);
    const onMapLoad = (map) => {
        setMap(map);
    };

    const showCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                if (marker) {
                    console.log("here");
                    marker.setPosition(currentLocation);
                } else {
                    console.log("there");
                    setMarker(new window.google.maps.Marker({
                        position: currentLocation,
                        icon: {
                            url:require("../../static/user_location.png"),
                            scaledSize: new window.google.maps.Size(32, 32)
                        },
                        title: "Your Location"
                    }));
                }
                map.panTo(currentLocation);
            })
        }
        
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAbVV04b50sVLWUYtMDVfEIuPnoFPU_mas',
        libraries,
    });

    const [mapContainerStyle, setMapContainerStyle] = useState({
        width: '50vw',
        height: '70vh',
      });

      useEffect(() => {
        const handleResize = () => {
          // Update mapContainerStyle based on screen size
          if (window.innerWidth <= 1280) {
            setMapContainerStyle({
              width: '100vw',
              height: '50vh', // Adjust the height as needed for smaller screens
            });
          } else {
            setMapContainerStyle({
                width: '50vw',
                height: '70vh',
            });
          }
          if (map) {
            window.google.maps.event.trigger(map, 'resize');
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
      }, [])

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div id="google-map">
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={17}
            center={plovdiv}
            onLoad={onMapLoad}
        >
            {marker && <Marker position={marker.position} />}
        </GoogleMap>
        <button onClick={showCurrentLocation} className="button-overlay">Покажи моята локация</button>
        </div>
    );
};