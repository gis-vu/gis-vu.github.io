var markers = [];

function removeContext(e) {
    var contextMenu = findMarkerWithClass("contextMenu");
    var tempMarker = findMarkerWithClass("tempMarker");
    
    if(contextMenu != null)
        contextMenu.remove();
    
     if(tempMarker != null)
        tempMarker.remove();
}

function createTempMarker(p){
    
    cleanTempMarkers();
    
    var el = document.createElement('div');
    el.className = 'tempMarker';

    var marker = new mapboxgl.Marker(el)
        .setLngLat(p)
        .addTo(map);
    
    markers.push(marker);
}

function contextClicked(e) {
    
    
    createTempMarker(e.lngLat);
    
//    cleanTempMarkers();
//    
//    var el = document.createElement('div');
//    el.className = 'tempMarker';
//
//    var marker = new mapboxgl.Marker(el)
//        .setLngLat(e.lngLat)
//        .addTo(map);
//    
//    markers.push(marker);
    
    
    var contextMenu = $.parseHTML("<div class='contextMenu'><input type=\"button\" value=\"Mar\u0161ruto prad\u017Eia\" onclick=\"setRouteStart()\" class=\"startBtn\"><input type=\"button\" value=\"Tarpinis taškas\" onclick=\"setRoutePoint()\" class=\"pointBtn\"><input type=\"button\" value=\"Mar\u0161ruto pabaiga\" onclick=\"setRouteEnd()\" class=\"endBtn\"><hr><input type=\"button\" value=\"Duomenų riboklis\" onclick=\"setPolygonPoint()\" class=\"polygonPointBtn\"><\/div>");
    
    
    marker = new mapboxgl.Marker(contextMenu[0])
        .setLngLat(e.lngLat)
        .addTo(map);
    
    markers.push(marker);
    
    e.preventDefault();
}

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
    
     var marker = $('#endMarker');
    
    if(!marker.is(":visible")){
        marker.show();
    }
    
        checkIfValidState();

}


function checkIfValidState(){
    
    cleanRoutes();
    
    return;
    
    var startMarker = findMarkerWithClass('startMarker');
    var endMarker = findMarkerWithClass('endMarker');
    var polygonMarker = findMarkersWithClass('polygonMarker');
      
    
    if(startMarker != null && endMarker != null && polygonMarker.length >= 3){
        
        $(".searchBtn").prop('disabled', false);
    }
        
        
    else{
        $(".searchBtn").prop('disabled', true);
    }    
}

function setRouteStart(){
    setRoute("startMarker");
    
    var marker = $('#startMarker');
    
    if(!marker.is(":visible")){
        marker.show();
    }
    
    
    
    checkIfValidState();
}

function setRoutePoint(){
    
    cleanRoutes();
    
    setRoute("pointMarker");
    
    var pointerIndex = countMarkerWithClass("pointMarker");
    
    var el = document.createElement('div');
    el.className = "pointMarker";

    var span = document.createElement('span');
    span.className = "number";
    $(span).text(pointerIndex)

    el.appendChild(span);
    
    
    var parent = document.createElement('div');
    parent.setAttribute('id', 'parent_' + pointerIndex);

    parent.className="parent";
    var removeBtn = document.createElement('div');
    removeBtn.className='removeBtn';
    $(removeBtn).text("Pašalinti");
    parent.appendChild(el);
    parent.appendChild(removeBtn);
    removeBtn.setAttribute('id', pointerIndex);
    removeBtn.addEventListener("click", removePointer);
    
    
    $('#pointMarkers').append(parent);
}

function setPolygonPoint(){
  
    setRoute("polygonMarker");
    
    var pointerIndex = countMarkerWithClass("polygonMarker");
    
    var el = document.createElement('div');
    el.className = "polygonMarker";

    var span = document.createElement('span');
    span.className = "number";
    $(span).text(pointerIndex)

    el.appendChild(span);
    
    
    var parent = document.createElement('div');
    parent.setAttribute('id', 'parentPolygon_' + pointerIndex);

    parent.className="parent2";
    var removeBtn = document.createElement('div');
    removeBtn.className='removeBtn';
    $(removeBtn).text("Pašalinti");
    parent.appendChild(el);
    parent.appendChild(removeBtn);
    removeBtn.setAttribute('id', pointerIndex);
    removeBtn.addEventListener("click", removePolygon);
    
    
    $('#polygonMarkers').append(parent);
    
    
    
    redrawPolygon();
    
    checkIfValidState();
}

function redrawPolygon(){
    
    if (map.getSource('polygon')) {
            map.removeLayer('polygon')
            map.removeSource('polygon')
    }
    
    var allPolygonMarkers = findMarkersWithClass("polygonMarker");
    
//    alert(allPolygonMarkers.length);
    
    var coordinates = [];
    
    for(var i = 0; i < allPolygonMarkers.length; i++){
        
        var c = allPolygonMarkers[i].getLngLat();
        var cc = [];
        
        cc.push(c.lng);
        cc.push(c.lat);
        
        coordinates.push(cc);
    }
    
    
    if(coordinates.length == 0)
        return;
    
    coordinates.push(coordinates[0]);
        
         map.addLayer({
      "id": "polygon",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": coordinatesToJson(coordinates)
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": '#ff4c4c',
        "line-width": 1,
        "line-opacity": 1
      }
    });
    
    
    
}


function coordinatesToJson(coordinates){
    return {
        "type": "LineString",
        "coordinates": coordinates
    }
}

function removePolygon(e){
//    alert(e.target.id);
    
    var id = e.target.id;
    
    removePolygonHelper(parseInt(id));
}



function removePolygonHelper(id){
    
    var pointerCount = countMarkerWithClass("polygonMarker");
    
    var element = $('#parentPolygon_' + id);
    element.remove();
    
    var allPointMarkers = findMarkersWithClass("polygonMarker");
    var markerToRemove = allPointMarkers[id - 1];
    markerToRemove.remove();
    var index = markers.indexOf(markerToRemove);
    if (index > -1) {
      markers.splice(index, 1);
    }  
    
    
    allPointMarkers = findMarkersWithClass("polygonMarker");
    
    for(var i = id; i < pointerCount; i++){
        var child = allPointMarkers[i - 1].getElement().childNodes[0];
        var value = parseInt($(child).text());
        $(child).text(value - 1);
        
        var element = $('#parentPolygon_' + (i + 1))[0];  
        var child2 = $(element.childNodes[0].childNodes[0]).text(value - 1);    
      
        element.setAttribute('id', 'parentPolygon_' + (value - 1));
        element.childNodes[1].setAttribute('id', (value - 1));
    }
    
    redrawPolygon();
    
    checkIfValidState();
    
}


function removePointerHelper(id){
    
    var pointerCount = countMarkerWithClass("pointMarker");
    
    var element = $('#parent_' + id);
    element.remove();
    
    var allPointMarkers = findMarkersWithClass("pointMarker");
    var markerToRemove = allPointMarkers[id - 1];
    markerToRemove.remove();
    var index = markers.indexOf(markerToRemove);
    if (index > -1) {
      markers.splice(index, 1);
    }  
    
    
    allPointMarkers = findMarkersWithClass("pointMarker");
    
    for(var i = id; i < pointerCount; i++){
        var child = allPointMarkers[i - 1].getElement().childNodes[0];
        var value = parseInt($(child).text());
        $(child).text(value - 1);
        
        var element = $('#parent_' + (i + 1))[0];  
        var child2 = $(element.childNodes[0].childNodes[0]).text(value - 1);    
      
        element.setAttribute('id', 'parent_' + (value - 1));
        element.childNodes[1].setAttribute('id', (value - 1));
    }
}

function removePointer(e){
    
     cleanRoutes();
    
    var id = e.target.id;
    
    removePointerHelper(parseInt(id));
            
}

function setRoute(className){
    var marker = findMarkerWithClass(className);
    
    if(marker != null && className != 'pointMarker' && className != 'polygonMarker'){
        marker.remove();
        removeMarkerFromArray(className);
    } 
    
    var tempMarker = findMarkerWithClass("tempMarker");

    cleanTempMarkers();
    
    createMarker(className,tempMarker.getLngLat());
    
    
    //set in side menu
   
//    if(findMarkerWithClass('startMarker')!=null) setAsSelected("startMarker");
//    if(findMarkerWithClass('endMarker')!=null) setAsSelected("endMarker");
}

function setAsSelected(className){
    $("." + className + "NotSelected").hide();
    $("." + className + "Selected").show();
}


function createMarker(className, coordinates){
    var el = document.createElement('div');
    el.className = className;

    if(className == 'pointMarker'){
        var span = document.createElement('span');
        span.className = "number";
        $(span).text(countMarkerWithClass("pointMarker") + 1)
        
        el.appendChild(span);
    }
    
    if(className == 'polygonMarker'){
        var span = document.createElement('span');
        span.className = "number";
        $(span).text(countMarkerWithClass("polygonMarker") + 1)
        
        el.appendChild(span);
    }
    
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

function findMarkersWithClass(className) {
    var markersToReturn = [];
    
    for (var i = 0, len = markers.length; i < len; i++) {
       if (markers[i].getElement().className.startsWith(className)){
            //console.log(markers[i].getElement().className[0]);
            markersToReturn.push(markers[i]); // Return as soon as the object is found

       }
    }
    return markersToReturn; // The object was not found
}

function countMarkerWithClass(className) {
    var count = 0;
    
    for (var i = 0, len = markers.length; i < len; i++) {
       if (markers[i].getElement().className.startsWith(className)){
            //console.log(markers[i].getElement().className[0]);
            count ++; // Return as soon as the object is found

       }
    }
    return count; // The object was not found
}

function removeMarkerFromArray(markerClass){
    var marker = findMarkerWithClass(markerClass);
    
    var index = markers.indexOf(marker);
    if (index > -1) {
      markers.splice(index, 1);
    }    
}


//# sourceURL=mapActions.js