const mongoose = require('mongoose')
require('../../mongo')
const bcrypt = require("bcryptjs");
const SALT_I = 10;

const UserSchema = new mongoose.Schema({ 
    number: {
        type: String,
        default:null,
    },
    name:{
        type: String, 
    },
    email:{type:String},
    role:{type:String, enum:["admin", "user", "retailer"], default:'user'},
    adminApprove:{type:Boolean, default:true},
    password: {
        type: String,
    }
}, {
    timestamps: true
});

// UserSchema.pre("save",function(next){
//     var user = this;
//     if(user.isModified("password")){
//         bcrypt.genSalt(SALT_I,function(err,salt){
//             if(err){
//                 return next(err)
//             }
//             bcrypt.hash(user.password,salt,function(err,hash){
//                 if(err){
//                     return next(err)
//                 }
//                 user.password = hash;
//                 next();
//             })
//         })
//     }else{
//         next();
//     }
// })


// UserSchema.methods.change_password = async (candidatePassword) => {
//     //Creating a Hash
//     var salt = bcrypt.genSaltSync(SALT_I);
//     var hash = bcrypt.hashSync(candidatePassword, salt);
//     return hash;
// };

// UserSchema.methods.comparepassword = async (candidatePassword,cb) => {
//    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
//        if(err){
//            return cb(err)
//        }
//        cb(null,isMatch)
//    })
// };

module.exports = mongoose.model('users', UserSchema)