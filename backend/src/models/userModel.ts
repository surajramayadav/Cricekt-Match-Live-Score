import mongoose from "mongoose";
  import validator from "validator";
  import bcrypt from "bcryptjs";
  
  
  const userScehma = new mongoose.Schema({
  email: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: [ 255, 'email should be less than 255 character' ],
    unique: true
  },
  password: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: [ 255, 'password should be less than 255 character' ],
    unique: false
  },
  name: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: [ 255, 'name should be less than 255 character' ],
    unique: false
  },
  phone_number: {
    type: 'Number',
    ref: '',
    required: false,
    maxlength: [ 255, 'phone_number should be less than 255 character' ],
    unique: true
  }
});
  
      //  Bcrypt Password
      userScehma.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    });
  
  export default mongoose.model("user", userScehma);