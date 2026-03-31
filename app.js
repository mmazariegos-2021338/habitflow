const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config();

// Conectar a MongoDB (funciona tanto local como en Vercel)
const connectDB = require("./config/db");
connectDB();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var habitosRouter = require('./routes/habitos');
var authRouter = require('./routes/auth');

var app = express();

// Configurar CORS para permitir el frontend de Vercel
app.use(cors({
  origin: ['https://habitflow-front.vercel.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/habitos', habitosRouter);

// Exportar para Vercel
module.exports = app;
