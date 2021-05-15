const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');


User.hasMany(Article, {
  foreignKey: 'userId'
});

Article.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Article.hasMany(Comment, {
  foreignKey: 'articleid',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Article, {
  foreignKey: 'articleid',
  onDelete: 'CASCADE'
});

module.exports = { User, Article, Comment };
