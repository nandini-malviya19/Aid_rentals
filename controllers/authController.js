const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {


    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const user = new User(req.body);
        await user.save();
        return res.status(201).send({
            success: true,
            message: "User created",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Serval Error in registering the user"
        });
    }
}
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "No user with this email found"
            });
        }
        //if the user exist we will compare the password
        if(user.role !== req.body.role){
            return res.status(200).send({
                success: false,
                message: "Entered Role is wrong"
            })
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            console.log("Enterd password is wrong");
            return res.status(200).send({
                success: false,
                message: "Wrong Password"
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).send({
            success: true,
            message: "User Logged In",
            token,
            user
        })



    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Serval Error in logging in the user"
        });
    }
}


const currentUserController = async (req, res) => {
    try {
        const user =await User.findOne({ _id: req.body.userId });
        if(!user){
            return res.status(500).send({
                success: false,
                message: "User not found "
            });
        }
        return res.status(200).send({
            success: true,
            message: "User found",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Can't get the current user "
        });
    }
}

module.exports = { register, login, currentUserController };