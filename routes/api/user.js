const express = require('express');

const router = express.Router();

// @route   GET api/user/test
// @desc    Tests user routes
// @access  Public
router.get('/test', (req, res) => {
  res.json({ Msg: 'Route works' });
});

module.exports = router;
