const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app = express()

//Defining paths for express config
const viewsPath = path.join(__dirname,'../templates/views')


const partialPath = path.join(__dirname, '../templates/partials')

//setting up handle bar engine
app.set('view engine','hbs')
app.set('views',viewsPath)//pointing express to correct place.
//was working perfectly as it was views folder before but we changed it to templates so we had to do this
hbs.registerPartials(partialPath)

//setting static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Chris L'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Chris L'
    })
})  
app.get('/help',(req,res)=>{
    res.render('help',{
        message: "I am learning",
        title: 'Help',
        name: 'Chris L'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error: 'You must enter an address'
        })
    }


    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location:location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'sunny',
    //     location:'philly',
    //     address: req.query.address
    // })
    
})  


app.get('/products',(req,res)=>{

        if(!req.query.search){
        return res.send({
            Error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 404,
        name:'Chris L',
        errorMessage: 'Help article not found'
    })
})
//* means all that hasnt been matched
app.get('*',(req,res)=>{
    res.render('404',{
        title: 404,
        name:'Chris L',
        errorMessage: 'Page not found'
    })
})

// app.listen(5000,()=>{
//     console.log('Server is up on 5000')
// })


//for heroku
const port = process.env.PORT || 5000
app.listen(port,()=>{
console.log(`Server is up on ${port}`)
 })
