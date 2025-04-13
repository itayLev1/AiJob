const express = require('express');
const { getUserProfile, updateUserProfile } = require('../agents/learnUserAgent');

const router = express.Router();

router.get('/user', (req, res) => {
  const profile = getUserProfile();
  res.json(profile);
});

router.post('/user', (req, res) => {
  const updated = updateUserProfile(req.body);
  res.json(updated);
});

module.exports = router;
