var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var whiteList = (process.env.CORS_ORIGIN || '').split(',');
var corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) >= 0){
            callback(null, true)
        } else {
            callback(new Error('Cors not allowed'));
        }
    }
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api/api');


var app = express();

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);
//http://localhost:3000 -> host
/*
api root folder
    /api/v1/pacientes
    /api/v1/expediente
    /api/v1/expediente/consulta
*/

module.exports = app;
