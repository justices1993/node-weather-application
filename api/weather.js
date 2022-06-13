const request = require('postman-request')

const weatherApi = (address, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=0de91843f6ead2619bfbd8818387332f&query='+ encodeURIComponent(address) +''

    request({url, json: true}, (error, {body}={})=> {
        if(error){
            return callback('Unable to access the internet', undefined)
        } else if(body.error){
            return callback('unable to find the location please try another search', undefined)
        }else {
            callback(undefined,{
              location:body.location.name,
              country: body.location.country,
              temperature: body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees ' + ' and it feels like ' + body.current.feelslike + ' degrees'
                          + ' there is a ' + body.current.precip + '% chance of rain',
              icon: body.current.weather_icons[0]
            })
        }
    })
}

module.exports = weatherApi
/*weatherApi('new york', (error,data)=> {
    console.log(data)
})*/