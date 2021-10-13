const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const path = require('path');


const DB = process.env.DB;
const ID = process.env.ID;
const PASS = process.env.PASS;


const sequelize = new Sequelize(DB, ID, PASS, {
  host: 'localhost',
  dialect: 'mysql'
});
try {
   sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app = express();

const db = require('./models');

//db.sequelize.sync({force: true});
db.sequelize.sync();              // important

// *** cors *** //

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));


const userRoutes = require('./routes/user');
const wallRoutes = require('./routes/wall');
const commentRoutes = require('./routes/comment');



app.use('/api/auth', userRoutes);
app.use('/api/wall', wallRoutes);
app.use('/api/comment', commentRoutes);




app.use(helmet());


module.exports = app;

