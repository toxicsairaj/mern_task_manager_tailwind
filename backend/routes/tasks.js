const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort('-createdAt');
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const t = new Task({ user: req.userId, title: req.body.title });
  await t.save();
  res.json(t);
});

router.put('/:id', auth, async (req, res) => {
  const t = await Task.findOneAndUpdate({ _id: req.params.id, user: req.userId }, { title: req.body.title, completed: req.body.completed }, { new: true });
  res.json(t);
});

router.delete('/:id', auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ok:true});
});

module.exports = router;
