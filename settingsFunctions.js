function invertSettings(){
    $('#settings').toggle();
}

function invertDownloadBox(){
//    $('#downloadBox').toggle();
    
     downloadRouteIndex(0); 
}


function showDownloadBtn(){
    $('.downloadBtn').show();
    
   
}

function invertRequestWindow(){
     $('#jsonRequestWindow').toggle();
}

function requestWindowOpen(){
    invertRequestWindow();
        
    $("#requestTextBox").val(JSON.stringify(getRequestData(), null, 4));  
}

function revertRequest(){
    
    try {
        var request = JSON.parse($("#requestTextBox").val());
        revertRequestHelper(request);
        
        invertRequestWindow();
    }
    catch(err) {
      alert(err);
    }    
}


function revertRequestHelper(request){
    
    var startPoint = request.start;
    var endPoint = request.end;
    var polygonPoints = request.polygonPoints;
    var points = request.points;
   
    
    var routeOverlapValue = Number(request.searchOptions.trackOverlapImportance);
    var forrestValue = Number(request.searchOptions.propertyValueImportance[0].importance);
    var waterValue = Number(request.searchOptions.propertyValueImportance[1].importance);
    var waterDistanceValue = Number(request.searchOptions.propertyValueImportance[1].threshold);
    
    var pathValue = Number(request.searchOptions.propertyImportance[0].importance);
    var walkingPathValue = Number(request.searchOptions.propertyImportance[3].importance);
    var routeValue = Number(request.searchOptions.propertyImportance[5].importance);
    var seriousRouteValue = Number(request.searchOptions.propertyImportance[17].importance);
    
    
    if(isNaN(pathValue) || isNaN(walkingPathValue) || isNaN(routeValue) || isNaN(seriousRouteValue))
        throw "Kelio tipo koeficientai įvesti klaidingai";

     if(isNaN(routeOverlapValue) || isNaN(forrestValue) || isNaN(waterValue) || isNaN(waterDistanceValue))
    throw "Miškų arba vandenų koeficientai įvesti klaidingai";
    
    
    $('#pathValue').val(pathValue);
    $('#walkingPathValue').val(walkingPathValue);
    $('#routeValue').val(routeValue);
    $('#seriousRouteValue').val(seriousRouteValue);
    
    
    $('#routeOverlapValue').val(routeOverlapValue);
    $('#forrestValue').val(forrestValue);
    $('#waterValue').val(waterValue);
    $('#waterDistanceValue').val(waterDistanceValue);
    
    
    var allPoints = polygonPoints.concat(points);
    
    if(startPoint!=null)
        allPoints.push(startPoint);
    
    if(endPoint!=null)
        allPoints.push(endPoint);
    
    allPoints.forEach(function(p) {
        var a = Number(p.lng);
        var b = Number(p.lat);

        if(isNaN(a) || isNaN(b))
                throw "Taškų duomenys įvesti klaidingai";
    });
    
    
    
    var oldPolygonMarkers = findMarkersWithClass('polygonMarker');
    
    for(var i =0; i< oldPolygonMarkers.length; i++){
        removePolygonHelper(1); 
    }
    
    
    for(var i =0; i< polygonPoints.length - 1; i++){
        createTempMarker(polygonPoints[i]);
        
        setPolygonPoint();
    }    
    
    
    var oldPointMarkers = findMarkersWithClass('pointMarker');

    for(var i =0; i< oldPointMarkers.length; i++){
        removePointerHelper(1); 
    }
    
    for(var i =0; i< points.length; i++){
        createTempMarker(points[i]);
        
        setRoutePoint();
    }    
}


function downloadRouteIndex(index){
         
    var data = oldData.routes[index];  
    
    var kml = tokml(data.data);
    
    download('route' + index + '.kml', kml);
}

function hideDownloadBtn(){
    $('.downloadBtn').hide();
}

function downloadRoute(){
    var id = this.id;
    var index = id.split('_')[1];
    
    var data = oldData.routes[index];  
    
    var kml = tokml(data.data);
    
    download('route' + index + '.kml', kml);
}


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}



//# sourceURL=settingsFunctions.js