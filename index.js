if(process.env.NODE_ENV!=="production")
{
  require("dotenv").config();
}
console.log();
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
const port = process.env.PORT||3000; //when deployin to server we will change it to 80

const authRoutes = require('./routes/auth');
// const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const csrf = require('csurf');
const flash = require('connect-flash');

const User = require('./models/user');

const MONGODB_URI =process.env.MONGODB_URI;

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

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
  );
  app.use(flash());
// app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
//  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);

// use express router
app.use("/", require("./routes"));
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Oh Something went wrong";
  }
  res.status(statusCode).render("error", { title: "Error", err: err });
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

const chatSockets=require('./config/chat_sockets').chatSockets(server);

mongoose
.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
.then(result => {
  server.listen(port, async function (err) {
  if (err) {
    return console.log(`Error in running the server: ${err}`);
  }
  
  return console.log(`Server fired up on port: ${port}`);
});
})
.catch(err => {
  console.log(err);
});

