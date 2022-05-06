const express = require('express'); //Express Import
const bodyParser = require('body-parser');
const { response } = require('express');
const PORT = 3000;
const app = express(); //Initialize the Library for Use

app.use(bodyParser.json());

app.listen(PORT,()=>{console.log("Listening on Port: " + PORT)});

app.post('/login',(request,response)=>{//POSt is new information to the server
    console.log("Request Reieved");
    const loginRequest = request.body;
    if (loginRequest.userName == "xandernew" && loginRequest.password == "P@SSWORD1"){
        response.status(200);
        response.send("Welcome")
    }else{
        response.status(401);
        response.send("Unauthorized")
    }
})

