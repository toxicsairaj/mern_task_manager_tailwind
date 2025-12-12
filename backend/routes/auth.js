const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const ex = await User.findOne({ email });
    if (ex) return res.status(400).json({msg:'User exists'});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const u = new User({ name, email, password: hash });
    await u.save();
    res.json({msg:'ok'});
  } catch (err) {
    res.status(500).json({error:'Server error'});
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({msg:'Invalid'});
    const ok = await bcrypt.compare(password, u.password);
    if (!ok) return res.status(400).json({msg:'Invalid'});
    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({token});
  } catch (err) {
    res.status(500).json({error:'Server error'});
  }
});

module.exports = router;
