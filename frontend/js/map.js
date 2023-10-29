let map, marker, presetMarker;

async function initMap() {
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker")

    const plovdiv = {lat: 42.1354, lng:24.7453};

    map = new Map(document.getElementById("map"), {
        center: plovdiv,
        zoom: 17,
        mapId: "4504f8b37365c3d0"
    });

    const infoWindow = new InfoWindow();

    const olderChildrenImage = document.createElement("img");
    olderChildrenImage.src = "../../resources/playground_blue.png"

    presetMarker = new AdvancedMarkerElement({
        position: plovdiv,
        map: map,
        title: "Already existing playground filler",
        content: olderChildrenImage
    })

    presetMarker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;

        infoWindow.close();
        infoWindow.setContent(presetMarker.title);
        infoWindow.open(presetMarker.map, presetMarker);
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
                  draggable: true,
                  icon: "../../resources/user_location.png",
                  title: "Your Location"
              });
          }
          
          map.setCenter(currentLocation);
      });
  } else {
      alert("Geolocation is not supported by your browser.");
  }
}

initMap()