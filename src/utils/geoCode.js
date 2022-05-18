const request = require('request');



function  geoCode(address,callback) {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWtyYW0xMDJ6YWtpIiwiYSI6ImNsMG8yc21wdTFoZXAzYnF0OHJoeXRxemUifQ.3jcuWa96eIUi68xw0KsJzg&limit=1`
    request({url : url , json : true}, (error,response)=>{
        if (error){
            callback('Unable to connect. Please check internet connection...', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location. Try another search...', undefined)
        } else {
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode