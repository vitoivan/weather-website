const request = require('request')

const forecast = (latitude,longitude, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=102c68dc9a66b0e9f76a7e314f985c8f&query=${latitude},${longitude}`

    request( { url, json: true }, (error, { body }) => {
        
        if(error){
            callback('Unable to connect to weather service.', undefined);
        }
        else if (body.success === false){
            callback('Unable to find location.', undefined);
        }
        else{
            const obj = {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions,
    
            }
            callback(undefined, obj)
        }
    } )

}

module.exports = forecast