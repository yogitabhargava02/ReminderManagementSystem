const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

// Set a new reminder
router.post('/new', reminderController.createReminder);

// Modify an existing reminder
router.put('/modify/:id', reminderController.modifyReminder);

// Disable an existing reminder
router.put('/disable/:id', reminderController.disableReminder);

// Enable an existing reminder
router.put('/enable/:id', reminderController.enableReminder);

// Delete an existing reminder
router.delete('/delete/:id', reminderController.deleteReminder);

// View reminders based on criteria
router.get('/view', reminderController.viewReminders);

module.exports = router;
