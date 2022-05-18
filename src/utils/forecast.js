const request = require('request');


function forcast(longitude, latitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=546cf2f55bf5edac20c656f716699bc6&query=${latitude},${longitude}&units=f`

    request({url : url, json : true},(error,response) => {
        console.log('response.bodyu---->',response.body)
        if (error) {
            callback('Unable to connect weather server. Please check internet connection!',undefined)
        } else if (response.body.error){
            console.log(response.body.error)
            console.log(response.body)
            callback("Access Restricted - Your current Subscription Plan does not support HTTPS Encryption.",undefined)
        } else {
            const data = response.body.current;
            console.log('data===>', data)
            console.log(data.weather_descriptions[0])
            callback(undefined,`It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degree out.`)
        }
    })


}

module.exports = forcast
