const sequelize = require('../config/connection');
const { User, Comment, Note } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const noteData = require('./noteData.json');

const seedDatabase = async () => {
  try {

    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Comment.bulkCreate(commentData, {
      individualHooks: true,
      returning: true,
    });
    await Note.bulkCreate(noteData, {
      individualHooks: true,
      returning: true,
    });



    process.exit(0);
  } catch (err) {
    console.log(err)
  }
};

seedDatabase();