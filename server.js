const express = require('express'); //Express Import

const app = express(); //Initialize the Library for Use

app.listen(3000,()=>{console.log("Listening!")});

app.get('/',(req,res)=>{res.send("Hello")})