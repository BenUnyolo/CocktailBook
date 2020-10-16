const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // library for password hashing
var jwt = require('jsonwebtoken'); // JSON web token library for user sessions

const auth = require("../middleware/auth");
const User = require('../models/User')

// login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password) { res.status(400).json({ msg: "Please enter a username and password." }) }

    const user = await User.findOne({ username: username });
    if (!user) { return res.status(400).json({ msg: "The username you entered did not match our records. Please try again." }) }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { return res.status(400).json({ msg: "The password you entered did not match our records. Please try again." }) }

    // creates the JSON web token with payload and secret
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// register user
router.post('/register', async (req, res) => {
  try {
    let { username, email, password, passwordCheck } = req.body;

    // validation
    if (!username || !email || !password || !passwordCheck) { return res.status(400).json({ msg: "All fields must be entered." }) }
    if (username.length > 15) { return res.status(400).json({ msg: "Your username must be 15 characters or less." }) }
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) { return res.status(400).json({ msg: "Invalid email address." }) }
    if (password.length < 6) { return res.status(400).json({ msg: "The password must be at least 6 characters long." }) }
    if (password !== passwordCheck) { return res.status(400).json({ msg: "The passwords you entered do not match." }) }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) { return res.status(400).json({ msg: "This username is taken, please choose another." }) }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) { return res.status(400).json({ msg: "An account with this email already exists." }) }

    //first argument to genSalt function is saltRounds, strength of hashing, affects speed
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hash
    });
    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user, please try again.');

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
});

// delete user
router.delete('/user', auth, async(req, res) => {
	try {
		const deletedUser = await User.deleteOne({ _id: req.user.id });
		res.json(deletedUser);
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// sends user back when receiving token
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password') // removes password from response
    .then(user => {
      res.json(user)
    })
});

module.exports = router;


