const express = require('express'); //Express Import
const https = require('https'); //HTTPS Import
const fs = require('fs'); //Import FileSystem Manipulation
//Import only the createClient object from redis
const redis = require('redis');
const client = redis.createClient({
	url: 'redis://default:P31frf331vvlL@xandernew.redis.cit270.com:6379',
}); //Create client
const bodyParser = require('body-parser'); //Import body parser
const md5 = require('md5'); //Import MD5 library
const PORT = 443; //Set PORT to 4043 for listening
const app = express(); //Initialize the Library for Use

client.on('error', (err) => console.log("Redis Client Error", err));

client.on('connect', function(){
    console.log('Conected!');
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd'
    }, app).listen(PORT,async () => {
        console.log("listening..");
        await client.connect();
});

app.use(bodyParser.json());

app.get("/", (request,response) => {
    response.send("Hello!");
})

app.post('/login',async (request,response)=>{//POSt is new information to the server
    console.log("Request Reieved");
    const loginRequest = request.body;
    var md5_pass = await client.hGet('password', loginRequest.userName);
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

app.post('/register',async (request,response)=>{
    console.log("Registration Recieved");
    const regRequest = request.body;
    var md5_pass = md5(regRequest.password);
    var exists = await client.hExists("password", regRequest.userName);
    if(exists){
        response.status(409);
        response.send("User Already Exists. Try Again!");
    }else{
        client.hSet("password", regRequest.userName, md5_pass);
        response.status(201);
        response.send("User" + regRequest.userName + " created!");
    }
})
