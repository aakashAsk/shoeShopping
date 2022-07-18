const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect(`${process.env.MONGO_URL}`,
{ useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
   console.log("Database Successfully Connected")
})
.catch(err=>{
   console.log("error",err);
})



