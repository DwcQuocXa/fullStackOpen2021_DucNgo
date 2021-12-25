const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const createUser = async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    console.log(username);

    const newUser = new User({
      username,
      name,
      passwordHash,
    });

    res.json(await newUser.save());
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    res.json(await User.find({}).populate("blogs", { title: 1, author: 1 }));
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, createUser };
