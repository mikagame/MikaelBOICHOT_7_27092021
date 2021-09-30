//const { Sequelize, DataTypes } = require('sequelize');



//const sequelize = new Sequelize('mysql');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        email: {type: DataTypes.STRING(255), allowNull: false, unique: true},
        username: {type: DataTypes.STRING(255), allowNull: false},
        password:{type: DataTypes.STRING(255), allowNull: false}
    },
        {tableName: 'Users'}
    );
    return User;
}



