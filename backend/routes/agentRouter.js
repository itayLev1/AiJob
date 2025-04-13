const express = require('express');
const { getUserProfile, updateUserProfile } = require('../agents/learnUserAgent');

const router = express.Router();

router.get('/user', (req, res) => {
  const profile = getUserProfile();
  console.log(`Profile: ${profile}`);
  res.json(profile);
});

router.post('/user', (req, res) => {
  const updated = updateUserProfile(req.body);
  console.log(`Updated: ${updated}`);
  
  res.json(updated);
});

module.exports = router;
