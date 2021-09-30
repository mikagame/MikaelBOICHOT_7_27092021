const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const path = require('path');


// *** connexion à mysql *** // 

/*const connection = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: "Mikael12",
  database: "db_groupomania"
});
connection.connect ((err) => {
  if (err) throw err;
  console.log ('Connecté!');
});*/

const sequelize = new Sequelize('db_groupomania', 'root', 'Mikael12', {
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

const db = require('./models')

//db.sequelize.sync({force: true});
 db.sequelize.sync();
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
app.use('/api/auth', userRoutes);

app.use(helmet());


module.exports = app;

