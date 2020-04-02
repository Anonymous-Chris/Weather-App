const request = require('request')

const geoCode = (address, callback)=>{
    //const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+(address)+'.json?access_token=pk.eyJ1Ijoia2xpbmd0aGUiLCJhIjoiY2s4ZXhyMjVkMDFjaTNlbHRlczdwcHFvaiJ9.Oqvlo3yOMXjr5px1uQH0wg'
    //down is an example of using all special characters without getting any errors
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2xpbmd0aGUiLCJhIjoiY2s4ZXhyMjVkMDFjaTNlbHRlczdwcHFvaiJ9.Oqvlo3yOMXjr5px1uQH0wg'

    request({url: url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if (response.body.features.length===0){
            callback('Unable to find location. try another search',undefined)
        }
        else{
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }) 
        }
    })
}



module.exports = geoCode