const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userId: {type: String, required: true, maxLength: 100},
    email: {type: String, required: true, maxLength: 100},
    password: {type: String, required: true, maxLength: 100},
  }
);

//Export model
module.exports = mongoose.model('Author', UserSchema);