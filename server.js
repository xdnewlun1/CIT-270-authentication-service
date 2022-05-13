const express = require('express'); //Express Import
const redis = require('redis');
const client = redis.createClient();
const bodyParser = require('body-parser');
const md5 = require('md5');
const { response } = require('express');
const PORT = 3000;
const app = express(); //Initialize the Library for Use

client.on('error', (err) => console.log("Redis Client Error", err));

client.connect();
client.on('connect', function(){
    console.log('Conected!');
});

app.use(bodyParser.json());

app.listen(PORT,()=>{console.log("Listening on Port: " + PORT)});

app.post('/login',async (request,response)=>{//POSt is new information to the server
    console.log("Request Reieved");
    const loginRequest = request.body;
    var md5_pass = await client.hGet('password', loginRequest.userName);
    console.log(loginRequest.userName);
    console.log(md5_pass);
    //Search DB for username and get current Hash
    loginRequest.password = md5(loginRequest.password)
    if (loginRequest.password == md5_pass){
        response.status(200);
        response.send("Welcome")
    }else{
        response.status(401);
        response.send("Unauthorized")
    }
})

