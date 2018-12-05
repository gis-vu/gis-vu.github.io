mapboxgl.accessToken = 'pk.eyJ1IjoiZGFpbml1c2thdm9saXVuYXMiLCJhIjoiY2ptbHNrd2d0MGFybzNxbzdiM2ttOG9jZiJ9.b94lBZSOYTNLvLLTjUx8OA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [25.2797, 54.6872],
    zoom: 7
});

$( document ).ready(function() {
    map.on("contextmenu", contextClicked);
    map.on("click", removeContext);
});

//map.on('load', function() {
//        map.addLayer({
//        "id": "region",
//        "type": "line",
//        "source": {
//            type: 'vector',
//            url: 'mapbox://dainiuskavoliunas.60891b69'
//        },
//        "source-layer": "apsk",
//        "layout": {},
//        "paint": {
//            "line-color": "#9ACD32",
//            "line-width": 3
//        }
//    });
//});

//# sourceURL=initializeMap.js