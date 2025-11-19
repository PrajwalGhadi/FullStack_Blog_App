const express = require("express");
const app = express();

const session = require('express-session')
app.use(session({
  secret: process.env.SESSION_SECRET || 'a-very-long-secret-key-minimum-32-chars',
  resave: true, // ⭐ IMPORTANT: Set to true
  saveUninitialized: true, // ⭐ IMPORTANT: Set to true
  cookie: { 
    secure: false, // false for HTTP development
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    sameSite: 'lax' // ⭐ ADD THIS for cross-origin requests
  },
  // ⭐ ADD SESSION STORE (Required for persistence)
  store: new session.MemoryStore() // For development
}));

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db.config");
connectDB();

const cookieParser = require("cookie-parser");

const cors = require("cors");
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://192.168.1.13:5173', 'http://localhost:3000', 'https://full-stack-blog-app1.vercel.app/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you're sending cookies/auth headers
}));

const authRouter = require('./routers/auth.route');
const blogRouter = require('./routers/blog.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Example limit change
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);

module.exports = app;
