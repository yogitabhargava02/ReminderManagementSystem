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
      const userId = req.query.userId;
      const fromDate = req.query.fromDate;
      const toDate = req.query.toDate;
      const subject = req.query.subject;
  
      // Construct the filter object based on the provided parameters
      const filter = { user: userId };
  
      if (fromDate) {
        filter.date = { $gte: new Date(fromDate) };
      }
  
      if (toDate) {
        // Assuming toDate should be inclusive, so we add one day to include reminders on toDate
        const toDateFilter = new Date(toDate);
        toDateFilter.setDate(toDateFilter.getDate() + 1);
        filter.date = { ...filter.date, $lt: toDateFilter };
      }
  
      if (subject) {
        filter.subject = subject;
      }
  
      // Fetch reminders based on the constructed filter
      const reminders = await Reminder.find(filter);
  
      res.status(200).json(reminders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

};

module.exports = reminderController;
