const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();


// middleware declear
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser()); 

// routers
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');


// routing
app.use('/api',authRouter);
app.use('/api',userRouter);



// connect DB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });


// connect Server
/* For Running the APP */
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is running on PORT - " + port);
});