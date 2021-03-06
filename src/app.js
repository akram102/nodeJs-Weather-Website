const path = require('path')
const request = require('request')

const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const forcast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

const publicDiractoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDiractoryPath))


app.get('',(req,res) => {
    res.render('index',
    {
        title : 'Weather App',
        name : 'Md Akram Zaki'
    })
})

app.get('/about',(req,res) => {
    res.render('about',
    {
        title : 'About Me',
        name: 'Akram'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({error : 'Please provide address'})
    }

    geoCode(req.query.address,(error,{longitude,latitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,forecastData)=>{
            if(error){
                console.log(error)
                return res.send({error})
            }
            res.send({
                location,
                address: req.query.address,
                forcast : forecastData
            })
        })
    })
    // res.send({
    //     name : 'akram',
    //     address : req.query.address
    // })
})
app.get('/help',(req,res) =>{
    res.render('help',
    {
        title : 'Help',
        name:'Akram',
        message : 'This is help page'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',
    {
        name:'Akram',
        title : '404',
        message: 'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',
    {
        title : '404',
        name:'Akram',
        message : 'Page Not Found'
    })
})
app.listen(port,() => {
    console.log('Server is running at port '+ port)
})