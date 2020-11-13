// Check if app is running in production and require .env
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index-route');
const userRouter = require('./routes/user-route');
const app = express();

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Configure sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.SSL_ENABLED || false }
}))

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', error => console.error(error)); 
db.once('open', () => console.log("DB connected")); 

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT || 3000}`)});
