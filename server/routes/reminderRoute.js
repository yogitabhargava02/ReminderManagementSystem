const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

router.post('/new', reminderController.createReminder);

router.put('/modify/:id', reminderController.modifyReminder);

router.put('/disable/:id', reminderController.disableReminder);

router.put('/enable/:id', reminderController.enableReminder);

router.delete('/delete/:id', reminderController.deleteReminder);

router.get('/view/:userId', reminderController.viewReminders);

module.exports = router;
