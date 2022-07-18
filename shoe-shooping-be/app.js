const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require("cors");
const app = express();
require('dotenv').config();


app.locals.user_id = session.user_id;
app.locals.user_name = session.user_name;
app.locals.user_type = session.user_type;


// view engine setup

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

/************ Session Created ***********/
app.use(
  session({
    secret: "secretkey14555444",
    resave: false,
    saveUninitialized: false,
  })
);


const auth = require('./server/routes/auth.route')
const product = require('./server/routes/product.routes')

app.use('/', auth);
app.use('/product', product);


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(process.env.MONGO_URL, function () {
//   console.log("server starting");
// });


module.exports = app;