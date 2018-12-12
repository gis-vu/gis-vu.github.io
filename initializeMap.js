mapboxgl.accessToken = 'pk.eyJ1IjoiZGFpbml1c2thdm9saXVuYXMiLCJhIjoiY2ptbHNrd2d0MGFybzNxbzdiM2ttOG9jZiJ9.b94lBZSOYTNLvLLTjUx8OA';


var colors = ['#e6194b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v9',
    center: [25.2797, 54.6872],
    zoom: 7
});

$( document ).ready(function() {
    map.on("contextmenu", contextClicked);
    map.on("click", removeContext);
});

 var layerList = document.getElementById('menu');
    var divs = layerList.getElementsByTagName('div');

    for (var i = 0; i < divs.length; i++) {
        divs[i].onclick = switchLayer;
    } 


 function switchLayer(layer) {
     var layerId = layer.target.id;
     
     $('.selected').each((i, e)=>{
         $(e).removeClass("selected"); 
     });
     
     $($("#" + layerId)[0].parentElement).addClass("selected");
     
     map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
 
 }

map.on('style.load', function() {
        
    
//    map.addLayer({
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
    
   
     redrawPolygon();
        
     if(typeof oldData !== 'undefined' && oldData != null){
         
          var i = 0;
                  
          oldData.routes.forEach(function(element) {
                addRoute(element, i);
            i++;
        });
         
         
         
     }    

});

//# sourceURL=initializeMap.js