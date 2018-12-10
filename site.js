var dev = false;

var url = '';

if(dev){
    url='http://localhost:5000/api/route';
}else{
    url = 'https://gis-vu-2.azurewebsites.net/api/route';
}

function loadScript (url) {
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: url,
            dataType: 'script',
            async: true
        }).done((response)=>{
                resolve(response);
            }).fail((error)=>{
                reject(error);
            });
    });
}

loadScript('.\\mapActions.js')
    .then(loadScript(".\\initializeMap.js"))
    .then(loadScript(".\\routeSearchAction.js"))
    .then(loadScript(".\\settingsFunctions.js"))
    .then(loadScript(".\\tokml.js"));