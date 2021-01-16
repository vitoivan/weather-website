const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

// Define Paths for express config
const publicDirectoryPath = path.join( __dirname, '../public/' )
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        titlePage: 'Weather App',
        title: 'Weather',
    })
})
// --------------------------------------------------- EndPoint que retorna um jSON com dados do local ----------------------------------//
app.get('/weather', (req, res) => {

    if(!req.query.adress){
        return res.send({
            error: 'You must provide a adress'
         })
    }
    else{

        geocode(req.query.adress, (e, { latitude='', longitude='', location:local='' } = {} ) => {
            // e = error
            if(e){
                return res.send(e)
            }
            else{
        
                forecast(latitude, longitude, (error, { description='', temperature='', feelslike='' } = {} ) => {
    
                    if(error){
                        return res.send(error)
                    }
                    else{
                        return res.send({
                            local,
                            description,
                            temperature,
                            feelslike
                        })
                    }
        
                })
            }
            
        })

    }
})
// ------------------------------------------------- Fim Endpoint -------------------------------------------------------------------//

app.get('/help', (req, res) => {
    res.render('help', {
        titlePage: 'Help',
        helptext: 'This is some helpful text ...',
        title: 'Help',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        titlePage: 'About',
        title: 'About Me',
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){

        return res.send({
           error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
            products: []
    
    })
})

app.get('/help/*', (req, res) => {
    res.render('page404', {
        titlePage: '404 - Not Found',
        title: '404 Error - Help page not Found',
    })
})

app.get('*', (req, res) => {
    res.render('page404', {
        titlePage: '404 - Not Found',
        title: '404 Error - Page not Found',
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})