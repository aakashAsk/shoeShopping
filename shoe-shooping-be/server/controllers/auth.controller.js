const UserModel = require('../models/auth.model')
const jwt = require('jsonwebtoken');
const keys = "dsfdsfdsfdsfsdfsfssfdsfsfegtgnb"
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    registerUser(req, res)
}

exports.signin = async (req, res, next) => {
    console.log(req.body)
    let user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password 
    })
    console.log(user)
    if (!user) {
        // registerUser(req, res)
        return res.status(200).json({
            title: "error",
            message: 'password is wrong',
            status: false
        });
    } else {
        // bcrypt.compare(password, user.password)
        // .then(isMatch => {
        //     if (isMatch) {
        //         req.session.userInfo = {
        //             user
        //         }
        //         req.session.user_id = user._id;
        //         const payload = {
        //             id: user._id
        //         }
        //         jwt.sign(
        //             payload,
        //             keys, {
        //                 expiresIn: '1d',
        //             },
        //             (err, token) => {
        //                 res.json({
        //                     status: true,
        //                     title: "success",
        //                     message: 'Login successfully',
        //                     token: token,
        //                 });
        //             }
        //         );
        //     } else {
        //         return res.status(200).json({
        //             title: "error",
        //             message: 'password is wrong',
        //             status: false
        //         });
        //     }
        // })
        // .catch(err => {
        //     res.json({
        //         status: false,
        //         title: "error",
        //         message: err,
        //     });
        // })

        res.json({
            status: true,
            title: "success",
            message: 'Login successfully',
            // token: token,
        });
    }

}

async function registerUser (req, res) {
    try {
        const body = req.body
        var newUser = new UserModel({
            ...req.body
        })
        let saveData = await newUser.save()
        if (saveData) {
            res.status(200).json({
                title: "success",
                message: "User Successfully Added",
                status: true
            })
        }
    } catch (err) {
        res.status(200).json({
            title: "error",
            message: "Internal Server Error",
            status: false,
            error: err
        })
    }
}
