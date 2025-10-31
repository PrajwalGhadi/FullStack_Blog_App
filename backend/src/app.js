const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db.config");
connectDB();

const cookieParser = require("cookie-parser");

const cors = require("cors");
app.use(cors({
    origin: {
        "http://localhost:3000": true,
        "http://localhost:5173/": true
    },
    credentials: true
}));

const authRouter = require('./routers/auth.route');

app.use(express.json()); // to parse json bodies
app.use(cookieParser());

app.use('/api/auth', authRouter);

module.exports = app;
