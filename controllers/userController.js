const userModel = require('../models/userModel').userModel;
const database = require('../models/userModel').database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserByGithubIdOrCreate = (profile) => {
  let user = userModel.findProfileEmail(profile.email);
  if (user) {
    return user;
  } else {
    let user = {
      id: database.length + 1,
      name: profile.name,
      email: profile.email,
      password: 'adsdf21dX!',
      reminders: []
    };
    database.push(user);
    return user;
  }
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = { getUserByEmailIdAndPassword, getUserById };
