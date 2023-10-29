function showCurrentLocationPlayground() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            if (marker) {
                marker.setPosition(currentLocation);
            } else {
                marker = new google.maps.Marker({
                    position: currentLocation,
                    map: map,
                    draggable: true,
                    icon: "../../resources/user_location.png",
                    title: "Your Location"
                });

                marker.addListener("dragend", (event) =>{
                    const position = marker.position
                    console.log(position.lat());
                    console.log(position.lng());
                })

            }
            
            map.setCenter(currentLocation);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}