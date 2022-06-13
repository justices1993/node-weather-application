const express  = require('express')
const weatherApi = require('../api/weather')
const path = require('path')
const hbs  = require('hbs')


const app = express()
const publicPath = path.join(__dirname,'../public')
const templatePath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

app.set('view engine', 'hbs')
app.set('views', templatePath)

app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

const port = 3000 || process.env.PORT

app.get('/',(req,res)=> {
    res.render('index',{
        title: 'Weather App',
        createdBy: 'Justice Sithole'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About',
        createdBy: 'Justice Sithole'
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title: 'Help',
        msg: 'Use the searh term to get the latest weather data',
        createdBy: 'Justice Sithole'
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.search){
        return res.send({error: 'Please provide a search term'})
    }
    weatherApi(req.query.search,(error,{location,country,temperature,icon}={})=> {
        if(error){
            return res.send({error})
        }
        res.send({
            location,
            country,
            temperature,
            icon,
            data: req.query.search
        })
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title: '404',
        msg: 'Page Not found',
        createdBy: 'Justice Sithole'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title: '404',
        msg: 'Page not found',
        createdBy: 'Justice Sithole'
    })
})

app.listen(port,()=> {
    console.log(`server started on port ${port}`)
})