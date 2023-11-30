import React, { useState, useEffect } from 'react';

const ModifyReminder = () => {
  const [subjects, setSubjects] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [formValues, setFormValues] = useState({
    date: '',
    subject: '',
    reminderId: '',
    description: '',
    emailAddress: '',
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
    fetchSubjects();
    fetchReminders();
  }, []);

  const fetchSubjects = async () => {
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
    setFormValues((prevValues) => ({
      ...prevValues,
      recurrence: {
        ...prevValues.recurrence,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/reminder/modify/${formValues.reminderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        console.log('Reminder modified successfully');
        // Redirect or perform any other action after modification
      } else {
        console.error('Failed to modify reminder');
      }
    } catch (error) {
      console.error('Error modifying reminder:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-md mt-10">
        <h1 className="text-3xl font-bold mb-8">Modify Reminder</h1>

        <form onSubmit={handleSubmit}>
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
            <label className="block text-sm font-medium text-gray-600">Add Description:</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email Address:</label>
            <input
              type="text"
              name="emailAddress"
              value={formValues.emailAddress}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
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
              required
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
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Recur for next:</label>
            <div>
              <input
                type="checkbox"
                name="days7"
                checked={formValues.recurrence.days7}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label className="mr-4">7 Days</label>

              <input
                type="checkbox"
                name="days5"
                checked={formValues.recurrence.days5}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label className="mr-4">5 Days</label>

              <input
                type="checkbox"
                name="days3"
                checked={formValues.recurrence.days3}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label className="mr-4">3 Days</label>

              <input
                type="checkbox"
                name="days2"
                checked={formValues.recurrence.days2}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label>2 Days</label>
            </div>
          </div>

          <div className="mb-8">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyReminder;
