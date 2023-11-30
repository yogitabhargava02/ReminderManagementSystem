const Reminder = require('../models/reminderSchema');

const reminderController = {
  createReminder: async (req, res) => {
    try {
      const newReminder = new Reminder(req.body);
      await newReminder.save();
      res.status(201).json(newReminder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  modifyReminder: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedReminder = await Reminder.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedReminder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  disableReminder: async (req, res) => {
    try {
      const { id } = req.params;
      const disabledReminder = await Reminder.findByIdAndUpdate(id, { status: 'disabled' }, { new: true });
      res.status(200).json(disabledReminder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  enableReminder: async (req, res) => {
    try {
      const { id } = req.params;
      const enabledReminder = await Reminder.findByIdAndUpdate(id, { status: 'enabled' }, { new: true });
      res.status(200).json(enabledReminder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteReminder: async (req, res) => {
    try {
      const { id } = req.params;
      await Reminder.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  viewReminders: async (req, res) => {
    try {
      // Implement logic to filter and retrieve reminders based on criteria (date, subject, etc.)
      // This will depend on your specific requirements.
      const reminders = await Reminder.find();
      res.status(200).json(reminders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = reminderController;
