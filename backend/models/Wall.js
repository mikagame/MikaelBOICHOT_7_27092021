module.exports = (sequelize, DataTypes) => {
    const Wall = sequelize.define('Wall', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userId: {type: DataTypes.STRING(255), allowNull: false},
        post: {type: DataTypes.STRING(255), allowNull: false},
        imgUrl: {type: DataTypes.STRING(255), allowNull: true},
        username: {type: DataTypes.STRING(255), allowNull: false},
    },
        {tableName: 'Walls'}
    );
    return Wall;
} 