const UserModel = require('../models/auth.model')
const jwt = require('jsonwebtoken');
const keys = "dsfdsfdsfdsfsdfsfssfdsfsfegtgnb"
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    registerUser(req, res)
}

exports.signin = async (req, res, next) => {
    let user = await UserModel.findOne({
        number: req.body.number,
        password: req.body.password 
    })
    if (!user) {
        return res.status(200).json({
            title: "error",
            message: 'No user found, Please check number and password',
            status: false,
        });
    } else {
        res.json({
            status: true,
            title: "success",
            message: 'Login successfully',
            token: user._id,
            user
        });
    }

}

async function registerUser (req, res) {
    try {
        let user = await UserModel.findOne({
            number: req.body.number,
        })
        if(!user){
            var newUser = new UserModel({
                ...req.body
            })
            let saveData = await newUser.save();
            if (saveData) {
                res.status(200).json({
                    title: "success",
                    message: "User Successfully Added",
                    status: true,
                    token: saveData._id
                })
            }
        }
        else{
            res.status(200).json({
                message: "Number is already registered with us",
                status: false,
            })
        }
    } catch (err) {
        res.status(200).json({
            title: "error",
            message: "Opps, something went wrong",
            status: false,
            error: err
        })
    }
}

exports.getAllUsersAdmin = async (req, res) => {
    try{
        UserModel.find({role: req.query.role})
        .then(result => {
            return res.status(200).json({
                message: 'Fetch all users',
                status: true,
                data: result
            });
        })
    }
    catch(err){
        return res.status(200).json({
            title: "error",
            message: 'Something went wrong, please try again later',
            status: false,
        });
    }
}

exports.approveOrRejectRetailer = async (req, res) => {
    try{
        UserModel.findOneAndUpdate({ _id: req.body.id }, { adminApprove : req.body.status})
            .then(result => {
                return res.status(200).json({
                    message: `Retailer ${req.body.status ? 'approve' : 'rejected'} successfully`,
                    status: true,
                    data: result
                });
            })
    }
    catch(err){

    }
}


