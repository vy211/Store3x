<<<<<<< HEAD
import express from 'express';

//const express = require('express');
console.log("hellowoeld");
const app = express();
app.use(express.json());


app.listen(3000, () => { console.log('listining on port 3000') });
=======
const express = require("express");
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.listen(4005, () => {
    console.log('Listening on 4005')
});
>>>>>>> Sandeep
