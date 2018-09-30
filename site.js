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
            "fill-opacity": 1
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