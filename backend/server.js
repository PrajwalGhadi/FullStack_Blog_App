const app = require('./src/app');
const PORT = process.env.PORT || 3000  // 3000 is fallback port

app.listen(PORT, ()=> {
    console.log('Connected Successfully on PORT: ', PORT);
    console.log(`In ${process.env.NODE_ENV} mode`)
})