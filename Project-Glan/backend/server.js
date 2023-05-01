const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require("./middleware/errorMiddleware")
const port = 5000;
//const port = process.env.PORT || 5000
const connectDB = require('./configs/config');
const { default: mongoose } = require('mongoose');

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
    //add route
app.use('/api/customer/', require('./routes/customerRouter'));
app.use('/api/privilege/', require('./routes/privilegeRouter'));
app.use('/api/feedback/', require('./routes/feedbackRouter'));
app.use('/api/notification/', require('./routes/notificationRouter'));
app.use('/api/task/', require('./routes/taskRouter'));

app.use(errorHandler)
mongoose.connection.once('open', () => {
    console.log("Connected to DB");
    app.listen(port, () => console.log(`Server started on port ${port}`));
});