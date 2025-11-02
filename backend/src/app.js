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
const blogRouter = require('./routers/blog.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Example limit change
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);

module.exports = app;
