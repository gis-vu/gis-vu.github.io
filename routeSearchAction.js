routesCount = 0;

function routeSearch(){
    
    var btn = $('.searchBtn')[0];
    var loader = $('.loader')[0];
    
    $(btn).toggle();
    $(loader).toggle();
    
    var startMarker = findMarkerWithClass('startMarker');
    var endMarker = findMarkerWithClass('endMarker');
    
    var request = 
        {
            'start':startMarker.getLngLat(),
            'end':endMarker.getLngLat()
        }
        
    fetch(url, {
        method: "POST", 
        headers: {"Content-Type": "application/json; charset=utf-8"}, 
        body: JSON.stringify(request),
    })
    .then(response => {
        $(btn).toggle();
        $(loader).toggle();
        return response.json()
    })
    .then(data => processResponse(data));
}


function processResponse(data){
    cleanRoutes();
    routesCount = data.routes.length;
    
    var i = 0;
        data.routes.forEach(function(element) {
          addRoute(element, i);
            i++;
        });
    highLight('route' + (routesCount - 1));
}


function cleanRoutes(){
    for(var i =0; i < routesCount; i++)
        if (map.getSource('route' + i)) {
            map.removeLayer('route' + i)
            map.removeSource('route' + i)
        }
    
    $('#routeResultBox').empty();
}

function addRoute (route, i) {
  var colors = ['#e6194b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'];
    
    map.addLayer({
      "id": "route" + i,
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": route.data
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": colors[i],
        "line-width": 8,
        "line-opacity": 1
      }
    });
  
    addRouteInfo(colors[i], i, route.info.length);
}

function addRouteInfo(color, index, info){
    
    var routeResult = document.createElement('div');
    routeResult.className = 'routeResult';
    $(routeResult).attr("id","route" + index);
    
    
    var routeColorBox = document.createElement('div');
    routeColorBox.className = 'routeColorBox';
    $(routeColorBox).css('background-color', color);
    
    var routeInfo = document.createElement('p');
    $(routeInfo).text(info);
    
    routeResult.append(routeColorBox);
    routeResult.append(routeInfo);
    
    $('#routeResultBox').append(routeResult);
    
    $(routeResult).click(function(){ highLight('route' + index);});
}

function highLight(layerId){
    map.moveLayer(layerId);
    
    $('.routeResult').css("background", 'white');
    $('#'+layerId).css("background", '#C0C0C0');
    
    
//    map.setPaintProperty(layerId, "line-width", 16);
}

//# sourceURL=routeSearchAction.js