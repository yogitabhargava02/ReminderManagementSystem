import React, { useState, useEffect } from 'react';

const EnableReminder = () => {
  const [subjects, setSubjects] = useState([]); 
  const [reminders, setReminders] = useState([]); 
  const [formValues, setFormValues] = useState({
    date: '', 
    subject: '',
    reminderId: '',
    description: '',
    email: '',
    contactNo: '',
    smsNo: '',
    recurrence: {
      days7: false,
      days5: false,
      days3: false,
      days2: false,
    },
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      recurrence: {
        ...formValues.recurrence,
        [name]: checked,
      },
    });
  };

  const handleEnableReminder = async () => {
    // Implement logic to send enable reminder request to the backend
    try {
      const response = await fetch(`http://localhost:3000/api/reminder/enable/${formValues.reminderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        console.log('Reminder enabled successfully');
        // Redirect or perform any other action after enabling
      } else {
        console.error('Failed to enable reminder');
      }
    } catch (error) {
      console.error('Error enabling reminder:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-md mt-10">
        <h1 className="text-3xl font-bold mb-8">Enable Reminder</h1>

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
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email Address:</label>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Contact No:</label>
          <input
            type="text"
            name="contactNo"
            value={formValues.contactNo}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">SMS No:</label>
          <input
            type="text"
            name="smsNo"
            value={formValues.smsNo}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Recur for next:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="days7"
                checked={formValues.recurrence.days7}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">7 Days</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="days5"
                checked={formValues.recurrence.days5}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">5 Days</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="days3"
                checked={formValues.recurrence.days3}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">3 Days</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="days2"
                checked={formValues.recurrence.days2}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">2 Days</span>
            </label>
          </div>
        </div>

        <div className="mb-8">
          <button type="button" onClick={handleEnableReminder} className="bg-green-500 text-white p-2 rounded-md">
            Enable Reminder
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EnableReminder;
