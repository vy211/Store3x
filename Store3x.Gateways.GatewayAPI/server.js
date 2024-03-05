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