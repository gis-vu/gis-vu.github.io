mapboxgl.accessToken = 'pk.eyJ1IjoiZGFpbml1c2thdm9saXVuYXMiLCJhIjoiY2ptbHNrd2d0MGFybzNxbzdiM2ttOG9jZiJ9.b94lBZSOYTNLvLLTjUx8OA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dainiuskavoliunas/cjmokl18u00q32sljbeffo8k7',
    center: [23.897, 55.322],
    zoom: 7
});



map.on('load', function() {

    map.addLayer({
        "id": "ltu-parks",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://dainiuskavoliunas.f34e329f'
        },
        "source-layer": "Parks",
        "layout": {},
        "paint": {
            "fill-color": "#228B22",
            "fill-opacity": 1,
            "fill-outline-color": "black"
        }
    });


    map.addLayer({
        "id": "ltu-parks-names",
        "type": "symbol",
        "source": {
            type: 'vector',
            url: 'mapbox://dainiuskavoliunas.f34e329f'
        },
        "source-layer": "Parks",
        "layout": {
            "icon-image": "{marker-symbol}-15",
            "text-field": "{name}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
        },
        "paint": {

            "text-color": "black"
        },
        "interactive": false
    });
});

 map.on('mouseenter', 'ltu-parks', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'ltu-parks', function () {
        map.getCanvas().style.cursor = '';
    });


 map.on('click', 'ltu-parks', function (e) {
        var coordinates = e.features[0].geometry.coordinates;
        var name = e.features[0].properties.name;
    
        var bounds = getBoundingBox(e);

        map.fitBounds(bounds, {
            padding: 20
        });
     
//     alert(name);
 })

function getBoundingBox(data) {
    var bounds = {};

    var coordinates = data.features[0].geometry.coordinates;
    
    var coords = [];
    
     for (var i = 0; i < coordinates.length; i++) {
         coords= coords.concat(getElements(coordinates[i]));         
     }
 
    for (var j = 0; j <coords.length; j++) {
      var longitude = coords[j][0];
      var latitude = coords[j][1];
      bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
      bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
      bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
      bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    }
  

  return [[bounds.xMax, bounds.yMax],[bounds.xMin, bounds.yMin]];
}

function getElements(data){
    
    if(Array.isArray(data) && Array.isArray(data[0]) && !Array.isArray(data[0][0]))
        return data;
    
    var coords = [];
    
    for (var i = 0; i < data.length; i++) {
        coords= coords.concat(getElements(data[i]));         
    }
    
    return coords;
}
    

