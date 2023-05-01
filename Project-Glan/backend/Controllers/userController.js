const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asynHandler = require('express-async-handler');
const User = require('../models/User');


const getUser = asynHandler( async (req, res) =>{

    //find user
    const { _id, Name, email} = await User.findById(req.user.id); 

    res.status(200).json({
        id : _id,
        Name,
        email
    });
})


const registerUser = asynHandler( async (req, res) => {

    const users = ({ Name, email, password } = req.body);

    if( !Name || !email || !password ){
        res.status(400);
        throw new Error('Please enter all fields');
    }

    //if user exists
    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists!');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        Name,
        email,
        password : hashedPassword 
    });

    if(user){
        res.status(201).json({
            _id : user.id,
            Name : user.Name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('User not created');
    }

})

const loginUser = asynHandler(async (req, res) => {

    const users = ({ email, password} = req.body);
    
    const user = await User.findOne({ email });

    //check user
    if( user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id : user.id,
            Name : user.Name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('Invalid login credentials');
    }
})

//generate a token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn : '1d'    
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}