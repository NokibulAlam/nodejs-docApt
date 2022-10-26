const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


// middleware declear
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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