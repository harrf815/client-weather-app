
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//! Define path for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//! Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//! Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

//! creating routes 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harrf Akbar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Harrf Akbar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'This is some helpful text',
        title: 'Help Page',
        name: 'Harrf Akbar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send ({ error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
   
})


//! handling with 404 errors 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harrf Akbar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Harrf Akbar",
        errorMessage: 'Page not found.'
    })
})

//! To start the server 
app.listen(port, () => {
    console.log('Server is online' + port)
})