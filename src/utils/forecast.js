

const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    const url ='https://api.darksky.net/forecast/6a6e8f20f7ec6de8713a2d0bc848388b/'+latitude+','+longitude
    request({url:url, json:true},(error,response)=>{
        if(error){
            callback('unable to connect to weather service',undefined)
        }
        else if(response.body.error ){
            callback('Coordinates not match',undefined)
        }
        else{
            callback(undefined,{
                temperature: response.body.currently.temperature,
                vis: response.body.currently.visibility
            })
        }
    })
}
module.exports = forecast