const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must at least 3 character long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // password will not come in queries by default
    },
    role: {
      type: String,
      enum: ["teacher", "student", "admin"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//auth token create
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" },
  );
  return token;
};

//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//hashed password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
