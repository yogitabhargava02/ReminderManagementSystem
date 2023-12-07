const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  smsNo: {
    type: String,
  },
  recurrence: {
    type: {
      days7: Boolean,
      days5: Boolean,
      days3: Boolean,
      days2: Boolean,
    },
  }
 
}, { collection: 'reminder' });

module.exports = mongoose.model('Reminder', reminderSchema);
