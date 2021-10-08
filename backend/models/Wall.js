module.exports = (sequelize, DataTypes) => {
    const Wall = sequelize.define('Wall', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userId: {type: DataTypes.STRING(255), allowNull: true},
        post: {type: DataTypes.STRING(255), allowNull: true}  
    },
        {tableName: 'Walls'}
    );
    return Wall;
} 