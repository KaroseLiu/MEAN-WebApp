var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  local: {
    email: String,
    fName: String,
    lName: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);
