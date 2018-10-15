routesCount = 0;

function routeSearch(){
    var startMarker = findMarkerWithClass('startMarker');
    var endMarker = findMarkerWithClass('endMarker');
    
    var request = 
        {
            'start':startMarker.getLngLat(),
            'end':endMarker.getLngLat()
        }
    
    var url = 'https://gis-vu-api.azurewebsites.net/api/route';
    
    fetch(url, {
        method: "POST", 
        headers: {"Content-Type": "application/json; charset=utf-8"}, 
        body: JSON.stringify(request),
    })
    .then(response => response.json())
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
}


function cleanRoutes(){
    for(var i =0; i < routesCount; i++)
        if (map.getSource('route' + i)) {
            map.removeLayer('route' + i)
            map.removeSource('route' + i)
        }
    
    $('#routeResultBox').empty();
}

function addRoute (coords, i) {
  var colors = ['#e6194b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'];
    
    map.addLayer({
      "id": "route" + i,
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": coords
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": colors[i],
        "line-width": 8,
        "line-opacity": 0.8
      }
    });
  
    addRouteInfo(colors[i],i);
}

function addRouteInfo(color, info){
    
    var routeResult = document.createElement('div');
    routeResult.className = 'routeResult';
    
    var routeColorBox = document.createElement('div');
    routeColorBox.className = 'routeColorBox';
    $(routeColorBox).css('background-color', color);
    
    var routeInfo = document.createElement('p');
    $(routeInfo).text(info);
    
    routeResult.append(routeColorBox);
    routeResult.append(routeInfo);
    
    $('#routeResultBox').append(routeResult);
}

//# sourceURL=routeSearchAction.js