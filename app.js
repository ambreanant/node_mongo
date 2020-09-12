const request = require('request');
const { response } = require('express');

const url = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02";

request({ url:url}, (error,response)=>{
    const data = JSON.parse(response.body);
    console.log(data.weather);

});