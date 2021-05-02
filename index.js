if(process.env.NODE_ENV!=="production")
{
  require("dotenv").config();
}
console.log(process.env.SECRET);
const express = require("express");
const path = require('path');
const http = require('http');
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const socketio = require('socket.io');

const server=http.createServer(app);
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./util/ExpressError");
const port = 3000; //when deployin to server we will change it to 80

const authRoutes = require('./routes/auth');
// const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI ='mongodb+srv://tarun:air1tarun@cluster0.uij0l.mongodb.net/shop?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: false }));
//console.log("port is ", process.env.LOCAL_PORT);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./assets"));

//extract style and scripts from subpages into layout

// setup view engine--ejs
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

app.use(methodOverride("_method")); //_method is query parameter to handle requests

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
// const csrfProtection = csrf();
