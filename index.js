const express = require('express')
const connectDB = require('./config/db')
const index = require('./routes/index')
const URL = require('./routes/url');
const app = express();


// connect DB


connectDB();
// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use('/', index );
app.use('/api/url', URL)

// if(process.env.NODE_ENV !==	production) {	
//    app.use(express.static(__dirname + "/public"));

// }


const PORT = process.env.PORT

app.listen(PORT, ()=>
console.log(`server running on ${PORT}`)
)