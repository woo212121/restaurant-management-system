const express = require('express');
const router = express.Router();
const controller = require('../BackendControllers/StaffLoginController');

router.post('/', async (req, res) => {
  const { username, pin } = req.body;
  try {
    const user = await controller.signIn(username, pin);
    res.json(user);
  } catch (error) {
    console.error(`Error signing in: ${error.message}`);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

router.post('/create-account', async (req, res) => {
  const { username, pin } = req.body;
  try {
    const newUser = await controller.createAccount(username, pin);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;
