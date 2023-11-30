import React, { useState, useEffect } from 'react';

const DisableReminder = () => {
  const [subjects, setSubjects] = useState([]); // Populate subjects based on your API
  const [reminders, setReminders] = useState([]); // Populate reminders based on your API
  const [formValues, setFormValues] = useState({
    date: '', // Add date state
    subject: '',
    reminderId: '',
    description: '',
  });

  useEffect(() => {
    // Fetch subjects and reminders when the component mounts
    fetchSubjects();
    fetchReminders();
  }, []);

  const fetchSubjects = async () => {
    // Fetch subjects from your API and set them in the state
    try {
      const response = await fetch('http://localhost:3000/api/subjects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      } else {
        console.error('Failed to fetch subjects');
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchReminders = async () => {
    // Fetch reminders from your API and set them in the state
    try {
      const response = await fetch('http://localhost:3000/api/reminders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReminders(data);
      } else {
        console.error('Failed to fetch reminders');
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDisableReminder = async () => {
    // Implement logic to send disable reminder request to the backend
    try {
      const response = await fetch(`http://localhost:3000/api/reminder/disable/${formValues.reminderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        console.log('Reminder disabled successfully');
        // Redirect or perform any other action after disabling
      } else {
        console.error('Failed to disable reminder');
      }
    } catch (error) {
      console.error('Error disabling reminder:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Disable Reminder</h1>

      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Select Date:</label>
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Select Subject:</label>
          <select
            name="subject"
            value={formValues.subject}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select a Subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Reminders:</label>
          <select
            name="reminderId"
            value={formValues.reminderId}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select a Reminder</option>
            {reminders.map((reminder) => (
              <option key={reminder._id} value={reminder._id}>
                {`${reminder.subject} - ${reminder.description.substring(0, 30)}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Description:</label>
          <textarea
            value={formValues.description}
            className="mt-1 p-2 w-full border rounded-md"
            readOnly
          />
        </div>

        <div className="mb-8">
          <button type="button" onClick={handleDisableReminder} className="bg-red-500 text-white p-2 rounded-md">
            Disable Reminder
          </button>
        </div>
      </form>
    </div>
  );
};

export default DisableReminder;
