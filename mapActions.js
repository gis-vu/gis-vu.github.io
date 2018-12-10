var markers = [];

function removeContext(e) {
    var contextMenu = findMarkerWithClass("contextMenu");
    var tempMarker = findMarkerWithClass("tempMarker");
    
    if(contextMenu != null)
        contextMenu.remove();
    
     if(tempMarker != null)
        tempMarker.remove();
}

function contextClicked(e) {
    
    cleanTempMarkers();
    
    var el = document.createElement('div');
    el.className = 'tempMarker';

    var marker = new mapboxgl.Marker(el)
        .setLngLat(e.lngLat)
        .addTo(map);
    
    markers.push(marker);
    
    
    var contextMenu = $.parseHTML("<div class='contextMenu'><input type=\"button\" value=\"Mar\u0161ruto prad\u017Eia\" onclick=\"setRouteStart()\" class=\"startBtn\"><input type=\"button\" value=\"Tarpinis taškas\" onclick=\"setRoutePoint()\" class=\"pointBtn\"><input type=\"button\" value=\"Mar\u0161ruto pabaiga\" onclick=\"setRouteEnd()\" class=\"endBtn\"><hr><input type=\"button\" value=\"Duomenų riboklis\" onclick=\"setPolygonPoint()\" class=\"polygonPointBtn\"><\/div>");
    
    
    marker = new mapboxgl.Marker(contextMenu[0])
        .setLngLat(e.lngLat)
        .addTo(map);
    
    markers.push(marker);
    
    e.preventDefault();
};

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

function setRoutePoint(){
    
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
    
//    var pointerIndex = countMarkerWithClass("polygonMarker");
//    
//    var el = document.createElement('div');
//    el.className = "polygonMarker";
////
//    var span = document.createElement('span');
//    span.className = "number";
//    $(span).text(pointerIndex)
//
//    el.appendChild(span);
//    
//    
//    var parent = document.createElement('div');
//    parent.setAttribute('id', 'parentPolygon_' + pointerIndex);
//
//    parent.className="parent";
//    var removeBtn = document.createElement('div');
//    removeBtn.className='removeBtn';
//    $(removeBtn).text("Pašalinti");
//    parent.appendChild(el);
//    parent.appendChild(removeBtn);
//    removeBtn.setAttribute('id', pointerIndex);
//    removeBtn.addEventListener("click", removePointer);
//    
//    
//    $('#pointMarkers').append(parent);
}

function removePointer(e){
//    alert(e.target.id);
    
    var pointerCount = countMarkerWithClass("pointMarker");
    
    var element = $('#parent_' + e.target.id);
    element.remove();
    
    var allPointMarkers = findMarkersWithClass("pointMarker");
    var markerToRemove = allPointMarkers[parseInt(e.target.id) - 1];
    markerToRemove.remove();
    var index = markers.indexOf(markerToRemove);
    if (index > -1) {
      markers.splice(index, 1);
    }  
    
    
    allPointMarkers = findMarkersWithClass("pointMarker");
    
    for(var i = parseInt(e.target.id); i < pointerCount; i++){
        var child = allPointMarkers[i - 1].getElement().childNodes[0];
        var value = parseInt($(child).text());
        $(child).text(value - 1);
        
        var element = $('#parent_' + (i + 1))[0];  
        var child2 = $(element.childNodes[0].childNodes[0]).text(value - 1);    
      
        element.setAttribute('id', 'parent_' + (value - 1));
        element.childNodes[1].setAttribute('id', (value - 1));
    }
    
    
    
   
    
    
    
    

    
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
   
    if(findMarkerWithClass('startMarker')!=null) setAsSelected("startMarker");
    if(findMarkerWithClass('endMarker')!=null) setAsSelected("endMarker");
    
    if($(".searchBtn").prop('disabled')){
        var startMarker = findMarkerWithClass("startMarker");
        var endMarker = findMarkerWithClass("endMarker");
        
        
        if(startMarker != null && endMarker != null){
            $(".searchBtn").prop('disabled', false);
        }
                
    }
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