module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        comment: {type: DataTypes.STRING(255), allowNull: false},
        
    },
        {tableName: 'Comments'}
    );
    return Comment;
} 