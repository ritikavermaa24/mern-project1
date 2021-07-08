const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json());


//const PORT = process.env.PORT;

app.use(require('./router/auth'));




const middleware = (req, res, next) => {
    console.log(`hi md` );
    next();
}

app.get('/',(req,res) => {
    res.send(`hello ritika`);

});

app.get('/about', middleware,(req,res) => {
    res.send(`hello riti`);

});

app.listen(3000, () => {
    console.log(`runnng`);
});

//mongodb+srv://ritika:<password>@cluster0.0vutz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
