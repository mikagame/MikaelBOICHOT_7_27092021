module.exports = (sequelize, DataTypes) => {
    const Wall = sequelize.define('Wall', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        comment: {type: DataTypes.STRING(255), allowNull: false},
        
    },
        {tableName: 'Walls'}
    );
    return Wall;
} 