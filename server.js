const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.set('views', 'views');
_ = require('underscore');

app.use(express.static(path.join(__dirname, 'public')));
const expressSession = require('express-session');
const flash = require('connect-flash');


//use the session

app.use(expressSession({
    secret: "MYS3CR3TK3Y",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
}));


app.use(flash());

app.use(bodyParser.urlencoded({
    extended: true
})); //body read

const crudRouter = require('./routes/crud.routes');

app.use(crudRouter);


require(path.join(__dirname, '/config/database'))();

app.listen(process.env.PORT, () => {
    console.log(`Server is running @ http://127.0.0.1:${process.env.PORT}`);
})