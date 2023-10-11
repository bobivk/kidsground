let map, marker;

function initMap() {

const plovdiv = {lat: 42.1354, lng:24.7453};

  map = new google.maps.Map(document.getElementById("map"), {
    center: plovdiv,
    zoom: 17,
  });
}

function showCurrentLocation() {
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
                  title: "Your Location"
              });
          }
          
          map.setCenter(currentLocation);
      });
  } else {
      alert("Geolocation is not supported by your browser.");
  }
}