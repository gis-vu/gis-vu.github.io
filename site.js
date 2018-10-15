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

loadScript('.\\initializeMap.js')
    .then(loadScript(".\\mapActions.js"))
    .then(loadScript(".\\routeSearchAction.js"));