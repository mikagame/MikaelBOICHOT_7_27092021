module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userId: {type: DataTypes.STRING(255), allowNull: false},
        postId: {type: DataTypes.STRING(255), allowNull: false},
        comment: {type: DataTypes.STRING(255), allowNull: false},
        username: {type: DataTypes.STRING(255), allowNull: false}
        
    },
        {tableName: 'Comments'}
    );
    return Comment;
} 