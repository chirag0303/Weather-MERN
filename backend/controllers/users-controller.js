const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async(req,res) => {
  const { email,password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }
  } catch(err) {
    return res.status(500).json({ message: 'Signing up failed' });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch(err) {
    return res.status(500).json({ message: 'Could not create user' });
  }

  const newUser = new User({
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
  } catch(err) {
    return res.status(500).json({ message: 'Signup failed while saving' })
  }

  res.status(201).json({ userId: newUser.id, email: newUser.email });
}

exports.signup = signup;