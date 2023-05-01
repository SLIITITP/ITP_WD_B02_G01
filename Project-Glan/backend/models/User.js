const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({
    Name : {
        type : String,
        required : [true, 'Please enter a name']
    },
    email : {
        type : String,
        required : [true, 'Please enter a email'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Please enter a name']
    }
});


module.exports = mongoose.model('User', userSchema);