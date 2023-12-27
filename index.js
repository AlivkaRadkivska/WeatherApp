const express = require("express")
const hbs = require("hbs")
const fetch = require("node-fetch")

const app = express()
const port = 3000
app.set("view engine", "hbs")
app.use(express.static(__dirname + '/views'))

app.get('/', (req, res) => {
    res.render('main')
})

app.get('/weather(/:city?)', async (req, res) => {
    let city = req.params.city
    if(city){
        let key = "3c7faefdb55568247cb467589934533c"
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${key}`
        let response = await fetch(url)
        let weather = await response.json()
        
        if(weather.cod != 200){
            res.redirect(`/error/${weather.cod}`)
        }
        res.render('weather', {weather})
    } else {
        res.redirect("/weather/kyiv")
        return 0
    }
})

app.get('/error/:code', (req, res) => {
    let code = req.params.code
    res.render('error', {code})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})