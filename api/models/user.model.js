const mongoose = require("mongoose");
const validator = require("../utils/validators");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    validate: {
      validator: validator.isFullName,
      message: props => `${props.value} is not a valid full name`
    },
    required: [true, 'Full name required'],
    trim:true
  },
  identificationDocument: {
    type: String,
    validate: {
      validator: validator.isIdentificationDocument,
      message: props => `${props.value} is not a valid identification document`
    },
    required: [true, 'Identification document required'],
    trim:true
  },
  cellPhone: {
    type: String,
    validate: {
      validator: validator.isCellPhone,
      message: props => `${props.value} is not a valid cellphone`
    },
    required: [true, 'CellPhone required']
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} is not a valid email`
    },
    required: [true, 'Email required']
  },
});


module.exports = mongoose.model("User", userSchema);
