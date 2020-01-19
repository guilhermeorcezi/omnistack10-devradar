const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

require('dotenv').config()

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});


app.use(cors());
app.use(express.json());
app.use(routes); 

server.listen(3333);