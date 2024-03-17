
//NOT working.....!!!!
const express = require('express');
const router = express.Router();
const auth = require('../services/authorization');

// Protected route
router.get('/protected', auth.protectedRoute, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed successfully', user: req.user });
});
router.post('/refresh-tokens', auth.refreshToken, (req, res) => {
    res.status(200).json({ message: 'Tokens refreshed successfully' });
  });
module.exports = router;
