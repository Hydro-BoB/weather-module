const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res) {

console.log(req.body.cityName);


const query = req.body.cityName;
const apiKey = "a2d412ddcb16f11f9211674c5a71f157";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data)

        const temp = weatherData.main.temp;

        const description = weatherData.weather[0].description;
        
        const icon = weatherData.weather[0].icon;

        const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

        console.log(temp);
        console.log(description);

        res.write("<h1>The temp in "+query+" is "+temp+" degrees</h1>");
        res.write("<h2>It is "+description+" today<h2>")
        res.write("<img src="+imageUrl+"><img>")

        res.send();


    })
});

})







app.listen(port,function() {
    console.log("server running 3002")
});