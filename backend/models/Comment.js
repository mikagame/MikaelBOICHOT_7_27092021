module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userId: {type: DataTypes.STRING(255), allowNull: true},
        postId: {type: DataTypes.STRING(255), allowNull: true},
        comment: {type: DataTypes.STRING(255), allowNull: false},
        
    },
        {tableName: 'Comments'}
    );
    return Comment;
} 