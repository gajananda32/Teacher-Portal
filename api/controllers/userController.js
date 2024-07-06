const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userCtrl = {}

userCtrl.registerUser = async (req, res) => {
    try {
        let reqBody = req.body;
        console.log("🚀 ~ userCtrl.registerUser= ~ reqBody:", reqBody);

        // Check if user already exists
        const userExists = await userModel.findOne({ email: reqBody.email });
        if (userExists) {
            return res.status(400).send({ message: 'User already registered with this email.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        reqBody.password = await bcrypt.hash(reqBody.password, salt);

        // Create user
        let create_user = await userModel.create(reqBody);

        // Generate JWT token
        const token = jwt.sign(
            { _id: create_user._id, email: create_user.email },
            process.env.JWT_SECRET,
            // { expiresIn: '1h' }
        );

        res.send({ status: 200, message: "User added successfully", data: create_user, token });

    } catch (error) {
        console.log("🚀 ~ userCtrl.registerUser= ~ error:", error);
        res.status(500).send({ message: 'Server error', error });
    }
};


// login function 
userCtrl.loginUser = async (req, res) => {
    try {
        let reqBody = req.body;
        console.log("🚀 ~ userCtrl.loginUser= ~ reqBody:", reqBody);

        // Check if user exists
        const user = await userModel.findOne({ email: reqBody.email });
        if (!user) {
            return res.status(400).send({ message: 'User not found with this email.' });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(reqBody.password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: 'Invalid password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            // { expiresIn: '1h' }
        );

        res.send({ status: 200, message: "User login successfully", data: user, token });

    } catch (error) {
        console.log("🚀 ~ userCtrl.loginUser= ~ error:", error);
        res.status(500).send({ message: 'Server error', error });
    }
};


module.exports = userCtrl