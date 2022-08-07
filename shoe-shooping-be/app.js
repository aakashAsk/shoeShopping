const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require("cors");
const app = express();
const multer  = require('multer')
const fileUpload = require('express-fileupload');
app.use(fileUpload());
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
const reservation = require('./server/routes/reservation.routes')

app.use('/', auth);
app.use('/product', product);
app.use('/reservation', reservation);
app.use(express.static(`${__dirname}/public`))
// var storage = multer.diskStorage({   
//   destination: function(req, file, cb) { 
//     console.log("############")
//      cb(null, './uploads');    
//   }, 
//   filename: function (req, file, cb) { 
//     console.log(file)
//      cb(null , file.originalname);   
//   }
// });
// var upload = multer({ storage: storage });

app.post('/uploadImage', (req, res) => {
  
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(process.env.MONGO_URL, function () {
// });


module.exports = app;