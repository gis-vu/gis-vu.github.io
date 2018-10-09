var markers = [];

map.on("contextmenu",function(e) {
    
    cleanTempMarkers();
    
    var el = document.createElement('div');
    el.className = 'tempMarker';

    var marker = new mapboxgl.Marker(el)
        .setLngLat(e.lngLat)
        .addTo(map);
    
    markers.push(marker);
    
    
    var contextMenu = $.parseHTML("<div class='contextMenu'><input type=\"button\" value=\"Mar\u0161ruto prad\u017Eia\"><input type=\"button\" value=\"Mar\u0161ruto pabaiga\"><\/div>");
    
    
    marker = new mapboxgl.Marker(contextMenu[0])
        .setLngLat(e.lngLat)
        .addTo(map);
    
    markers.push(marker);
    
    e.preventDefault();
});

function cleanTempMarkers(){
    markers.forEach(function(marker){
        marker.remove();
    })
    
    markers = [];
};

//# sourceURL=mapActions.js