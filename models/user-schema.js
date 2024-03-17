const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user = require("../routes");
const Userschema = mongoose.Schema({
  user: { type: String },
  password: { type: String },
  phno: { type: Number },
  // rating:{type:Number}
});

Userschema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const user = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, user);

    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

Userschema.method.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  //  const compare=await bcrypt.compare(this.password,hash);

  return compare;
};

module.exports = mongoose.model("users", Userschema);
