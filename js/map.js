var initialize = function() {
	console.log("map initialize");
	var pos = new google.maps.LatLng(53.307029,-6.221084)
	var mapOptions = {
		zoom: 17,
		center: pos
	};

	window.googlemap = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	var panoramaOptions = {
    position: pos,
    pov: {
      heading: 34,
      pitch: 10
    }
  };
  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
  window.googlemap.setStreetView(panorama);
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(success, error, {timeout:10000,enableHighAccuracy: true});
	} else {
	  alert('geo location not supported');
	}
	//document.getElementById('streetview').src("https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76") 
}
function calcRoute(start,end) {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay.setMap(window.googlemap);
  var request = {
      origin: start,
      destination: end,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
	  window.googlemap.fitBounds(directionsDisplay.getDirections().routes[0].bounds);
    }
	  else { alert ("No Directions Found")
    }

  });
}
function positioncallback(latlng){
	var geocoder = new google.maps.Geocoder();
	var marker = new google.maps.Marker({
      position: latlng, 
      map: window.googlemap, 
      title:"You are here!"
  });
  //53.309159,-6.224268
  //calcRoute(latlng,new google.maps.LatLng(53.307029,-6.221084));
  calcRoute(new google.maps.LatLng(53.309186,-6.222639),new google.maps.LatLng(53.307029,-6.221084));
}
function success(position) {
	myLat = position.coords.latitude;
	myLong = position.coords.longitude;

	var latlng = new google.maps.LatLng(myLat, myLong);
	
	positioncallback(latlng);
}
function loadScript() {
	
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initialize';
  document.body.appendChild(script);
}
function error(msg) {
  //var s = document.querySelector('#status');
  //s.innerHTML = typeof msg == 'string' ? msg : "failed";
  //s.className = 'fail';
  
  console.log(msg);
}

document.addEventListener("deviceready", init, false);
function init() {
	initialize();
}
