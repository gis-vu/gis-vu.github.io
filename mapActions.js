var markers = [];

map.on("contextmenu",function(e) {
    
    cleanTempMarkers();
    
    var el = document.createElement('div');
    el.className = 'tempMarker';

    var marker = new mapboxgl.Marker(el)
        .setLngLat(e.lngLat)
        .addTo(map);
    
    markers.push(marker);
    
    
    var contextMenu = $.parseHTML("<div class='contextMenu'><input type=\"button\" value=\"Mar\u0161ruto prad\u017Eia\" onclick=\"setRouteStart()\"><input type=\"button\" value=\"Mar\u0161ruto pabaiga\" onclick=\"setRouteEnd()\"><\/div>");
    
    
    marker = new mapboxgl.Marker(contextMenu[0])
        .setLngLat(e.lngLat)
        .addTo(map);
    
    markers.push(marker);
    
    e.preventDefault();
});

function cleanTempMarkers(){
    
    var tempMarker = findMarkerWithClass("tempMarker");
    var menuMarker = findMarkerWithClass("contextMenu");
    if(tempMarker!=null)tempMarker.remove();
    if(menuMarker!=null)menuMarker.remove();
    
    removeMarkerFromArray("contextMenu");
    removeMarkerFromArray("tempMarker");
};

function setRouteEnd(){
     setRoute("endMarker");
}


function setRouteStart(){
    setRoute("startMarker");
}


function setRoute(className){
    var startMarker = findMarkerWithClass(className);
    
    if(startMarker != null) startMarker.remove();
    removeMarkerFromArray(className);
    
    var tempMarker = findMarkerWithClass("tempMarker");

    cleanTempMarkers();
    
    createMarker(className,tempMarker.getLngLat());
    
    
    //set in side menu
}


function createMarker(className, coordinates){
    var el = document.createElement('div');
    el.className = className;

    var marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .addTo(map);
    
    markers.push(marker);
}


function findMarkerWithClass(className) {
    for (var i = 0, len = markers.length; i < len; i++) {
       if (markers[i].getElement().className.startsWith(className)){
            //console.log(markers[i].getElement().className[0]);
            return markers[i]; // Return as soon as the object is found

       }
    }
    return null; // The object was not found
}

function removeMarkerFromArray(markerClass){
    var marker = findMarkerWithClass(markerClass);
    
    var index = markers.indexOf(marker);
    if (index > -1) {
      markers.splice(index, 1);
    }    
}


//# sourceURL=mapActions.js