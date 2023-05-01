const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorHandler');
const PORT = 5000;
const colors = require('colors');
const connectDB = require('./config');
const { default: mongoose } = require('mongoose');

connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/task', require('./Routers/taskRouter'));
//app.use('/api/user', require('./Routers/userRouter'));
app.use(errorHandler);

mongoose.connection.once('open', () =>{
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});



