const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname,'../views/partials')


app.set('view engine','hbs')
app.use(express.static(publicDirPath))
hbs.registerPartials(partialPath)


app.get('' ,(req,res) => {
    res.render('index',{
        title :'weather',
    name: 'Hemika'
    })
    
})

app.get('/help',(req , res) => {
    res.render('help',{
        helpText: 'this is help page',
        title: 'help page',
        name: 'Hemika'
    })        
})

app.get('/weather',(req , res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} ={} ) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
             })
        })
    })
 
})

app.get('/about',(req , res) => {
    res.render('about',{
        title: 'about me',
        name: 'Hemika'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hemika',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hemika',
        errorMessage: 'Page not found.'
    })
})

app.listen(port,() => {
    console.log('server running on port ' + port)
})