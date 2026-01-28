const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const isExists = await userModel.findOne({ email });
    if (isExists) {
      return res
        .status(400)
        .json({ message: "user is already exists! Please Log in to continue" });
    }

    const hashPassword = await userModel.hashPassword(password);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    const token = newUser.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
};
