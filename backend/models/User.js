
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        email: {type: DataTypes.STRING(255), allowNull: false, unique: true},
        username: {type: DataTypes.STRING(255), allowNull: false, unique: true},
        password:{type: DataTypes.STRING(255), allowNull: false},
        isAdmin: {type: DataTypes.BOOLEAN, allowNull: false, default: false}
    },
        {tableName: 'Users'}
    );
    return User;
}



