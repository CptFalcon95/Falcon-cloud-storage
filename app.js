// Check if app is running in production and require .env
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
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

// Configure Mongoose
mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
});

// Configure sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ 
    db: "nodeapp",
    url: "mongodb+srv://nodeapp:nodeapp@nodeapp.qqikt.mongodb.net/nodeapp"
  })
}));

// Configure database
const db = mongoose.connection;
db.on('error', error => console.error(error)); 
db.once('open', () => console.log("DB connected")); 

// Routers
app.use('/', indexRouter);
app.use('/user', userRouter);

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT || 3000}`)
});