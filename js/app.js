/*
 Author: Sundeep
 URL: 
 */

var map, marker;
var startPos = [stops[0].coords.lat, stops[0].coords.lng];
var speed = 50; // km/h

var delay = 100;

      
function animateMarker(marker, km_h) {
    var target = 0;
    var km_h = km_h || 50;


    function goToPoint() {
        var lat = marker.position.lat();
        var lng = marker.position.lng();
        var step = (km_h * 1000 * delay) / 3600000; // in meters

        var dest = new google.maps.LatLng(
        stops[target].coords.lat, stops[target].coords.lng);

        var distance =
        google.maps.geometry.spherical.computeDistanceBetween(
        dest, marker.position); // in meters

        var numStep = distance / step;
        var i = 0;
        var deltaLat = (stops[target].coords.lat - lat) / numStep;
        var deltaLng = (stops[target].coords.lng - lng) / numStep;

        function moveMarker() {
            lat += deltaLat;
            lng += deltaLng;
            i += step;

            if (i < distance) {
                marker.setPosition(new google.maps.LatLng(lat, lng));
                setTimeout(moveMarker, delay);
            }
            else {
                marker.setPosition(dest);
                target++;
                if (target == stops.length) { target = 0; }

                setTimeout(goToPoint, delay);
            }
        }
        moveMarker();
    }
            
    goToPoint();
            
            
}

        

function initialize() {
           
    var myOptions = {
        zoom: 16,
        center: new google.maps.LatLng(28.412839, 77.041664),
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

            

            
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(stops[0].coords.lat, stops[0].coords.lng),
        map: map
    });

    // Loop through stops
    for (var i = 0; i < stops.length; i++) {
        // Add stop
        addStop(stops[i]);
    }

    // Add Marker Function
    function addStop(props) {
        var stop = new google.maps.Marker({
            position: props.coords,
            map: map,
            icon: './images/flag.png'
                    
                
                    
        });
                
                

        // Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            stop.addListener('click', function () {
                infoWindow.open(map, stop);
            });
        }
    }
            

    google.maps.event.addListenerOnce(map, 'idle', function () {
                
        marker.setIcon('./images/bus.png');
        animateMarker(marker, 400);//set speed
        addStop({ coords: event });
                
                
                
    });
}
        

initialize();