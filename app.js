window.lat = 12.3711876
window.lng = 76.5851589;

var map;
var mark;
var lineCoords = [];

var initialize = function() {
  map  = new google.maps.Map(document.getElementById('map-canvas'), {
    center: { lat: lat, lng: lng },
    zoom: 12
  });
  mark = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map
  });
};

const firebaseConfig = {
  apiKey: "AIzaSyCv9dCLiGGlw4nTzRLVIoE1bsrSbdeOsRg",
  authDomain: "electronic-safety-jacket.firebaseapp.com",
  databaseURL: "https://electronic-safety-jacket-default-rtdb.firebaseio.com",
  projectId: "electronic-safety-jacket",
  storageBucket: "electronic-safety-jacket.firebasestorage.app",
  messagingSenderId: "441362899534",
  appId: "1:441362899534:web:824d7e4f8839da0053991f",
  measurementId: "G-TCLMHWTBQW"
};

window.initialize = initialize;

firebase.initializeApp(firebaseConfig);

var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
  var gps = snapshot.val();
  console.log(gps.LAT);
  console.log(gps.LNG);
  lat = gps.LAT;
  lng = gps.LNG;

  map.setCenter({ lat: lat, lng: lng, alt: 0 });
  mark.setPosition({ lat: lat, lng: lng, alt: 0 });

  lineCoords.push(new google.maps.LatLng(lat, lng));

  var lineCoordinatesPath = new google.maps.Polyline({
    path: lineCoords,
    geodesic: true,
    strokeColor: '#2E10FF'
  });

  lineCoordinatesPath.setMap(map);
}, function(error) {
  console.log("Error: " + error.code);
});
