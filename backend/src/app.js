const express = require("express");
const app = express();

app.set("trust proxy", 1);

const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      // CRITICAL: MUST be true because Render uses HTTPS
      secure: true,

      // CRITICAL: MUST be 'none' for cookies to be sent from Netlify (Origin) to Render (API)
      sameSite: "none",

      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },

    store: MongoStore.create({
      // This should be your MongoDB connection URI (e.g., from process.env.MONGO_URI)
      mongoUrl: process.env.MONGODB_URI,

      // Optional: time to live for sessions in the database (e.g., 14 days)
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db.config");
connectDB();

const cookieParser = require("cookie-parser");

const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.1.13:5173",
      "http://localhost:3000",
      // 👇 CORRECTED: Removed trailing slash
      "https://full-stack-blog-app1.vercel.app",
      "https://blogingapp1.netlify.app", // 👇 CORRECTED: Removed trailing slash
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const authRouter = require("./routers/auth.route");
const blogRouter = require("./routers/blog.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Example limit change
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);

module.exports = app;
