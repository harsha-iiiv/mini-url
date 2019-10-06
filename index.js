const express = require('express')
const connectDB = require('./config/db')
const index = require('./routes/index')
const URL = require('./routes/url');
const app = express();


// connect DB


connectDB();
// app.set("view engine", "pug");

app.use(express.json());

app.use('/', index );
app.use('/api/url', URL)



const PORT = 5001 || process.env.PORT

app.listen(PORT, ()=>
console.log(`server running on ${PORT}`)
)