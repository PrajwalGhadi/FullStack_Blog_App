const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db.config");
connectDB();

const cookieParser = require("cookie-parser");

const authRouter = require('./routers/auth.route');

app.use(express.json()); // to parse json bodies
app.use(cookieParser());

app.use('/api/auth', authRouter);

module.exports = app;
