const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI).then(()=> {
        console.log('Connected to DB...');
    }).catch((error)=> {
        console.log('DB ERROR: ', error.message);
    })
}

module.exports = connectDB;