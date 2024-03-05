import express from 'express';

//const express = require('express');
console.log("hellowoeld");
const app = express();
app.use(express.json());


app.listen(3000, () => { console.log('listining on port 3000') });