var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String

});

module.exports = mongoose.model('Book', BookSchema);
