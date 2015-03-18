var map;
var pointsOnMap = [
        [53.6448827, 23.8546979, 1, {
            'head'    : 'Name',
            'address' : 'Address',
            'tel'     : 'Phone',
            'open'    : 'Opened from: - to:',
            'common'  : 'Some text'

        }]
    ];

// Function return array of markers that was create from "locations" and added to "map"
function setMarkers(map, locations) {
        var markers = [];
        var image = new google.maps.MarkerImage('img/map-baloon.png');
        for (var i = 0; i < locations.length; i++) {
            var point    = locations[i];
            var myLatlng = new google.maps.LatLng(point[0], point[1]);
            var marker   = new google.maps.Marker({
                position : myLatlng,
                map      : map,
                icon     : image,
                title    : point[3].head,
                zIndex   : point[2]
            });
            marker.infoContent = point[3];
            markers.push(marker);
        }
        return markers;
    }

// After function is complete all marker in array will contain object with info for infowindow
function setInfoWindowContent(arrayOfMarkers, infoWindow) {
        for (var i = 0; i < arrayOfMarkers.length; i++) {
            google.maps.event.addListener(arrayOfMarkers[i], 'click', function() {
                var content = composeInfoWindowContent(this.infoContent);
                infoWindow.setContent(content);
                infoWindow.open(map, this);
            });
        }
    }

function composeInfoWindowContent(data) {
    return '<ul class="marker-info">' +
                '<li class="marker-info__head">'     + data.head    + '</li>' +
                '<li class="marker-info__address">'  + data.address + '</li>' +
                '<li class="marker-info__tel">'      + data.tel     + '</li>' +
                '<li class="marker-info__open">'     + data.open    + '</li>' +
                '<li class="marker-info__common">'   + data.common  + '</li>' +
            '</ul>';
    }

function initialize() {
    var mapOptions = {
            zoom: 14,
            disableDefaultUI: false,
            scrollwheel: false,
            center: new google.maps.LatLng(53.6448827, 23.8546979)
        };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var mapMarkers = setMarkers(map, pointsOnMap);

    var mapInfoWindow = new google.maps.InfoWindow();

    setInfoWindowContent(mapMarkers, mapInfoWindow);
}

google.maps.event.addDomListener(window, 'load', initialize);