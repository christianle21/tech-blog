const User = require('./User');
const Comment = require('./Comment');
const Note = require('./Note');

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Note, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.hasMany(Note, {
  foreignKey: 'comment_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Note.belongsTo(User, {
  foreignKey: 'user_id',
});

Note.belongsTo(Comment, {
  foreignKey: 'user_id',
});

module.exports = { User, Comment, Note };