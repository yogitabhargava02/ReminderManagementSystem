import React, { useState, useEffect } from 'react';

const ViewReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    fromDate: '',
    toDate: '',
    subject: '',
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/reminder/view/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReminders(data);
        setFilteredReminders(data);
      } else {
        console.error('Failed to fetch reminders');
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const applyFilters = () => {
    let filtered = reminders;

    if (filterOptions.fromDate) {
      filtered = filtered.filter((reminder) => new Date(reminder.date) >= new Date(filterOptions.fromDate));
    }

    if (filterOptions.toDate) {
      filtered = filtered.filter((reminder) => new Date(reminder.date) <= new Date(filterOptions.toDate));
    }

    if (filterOptions.subject) {
      filtered = filtered.filter((reminder) => reminder.subject === filterOptions.subject);
    }

    setFilteredReminders(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">View Your Reminders</h1>

      <div className="flex mb-8 space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600">From Date:</label>
          <input type="date" name="fromDate" value={filterOptions.fromDate} onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md" />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600">To Date:</label>
          <input type="date" name="toDate" value={filterOptions.toDate} onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md" />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600">Subject:</label>
          <select name="subject" value={filterOptions.subject} onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md">
            <option value="">Select a Subject</option>
            {/* Add options based on your subjects */}
          </select>
        </div>

        <button onClick={applyFilters} className="bg-blue-500 text-white py-2 px-4 rounded-md">Apply Filters</button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Reminder Name</th>
            <th className="py-2 px-4">Reminder Subject</th>
            <th className="py-2 px-4">Reminder Description</th>
            <th className="py-2 px-4">Email Address</th>
            <th className="py-2 px-4">Contact No</th>
            <th className="py-2 px-4">SMS No</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Recurrence Frequency</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReminders.map((reminder) => (
            <tr key={reminder._id} className="border-t">
              <td className="py-2 px-4">{/* Reminder Name */}</td>
              <td className="py-2 px-4">{reminder.subject}</td>
              <td className="py-2 px-4">{reminder.description}</td>
              <td className="py-2 px-4">{reminder.email}</td>
              <td className="py-2 px-4">{reminder.contactNo}</td>
              <td className="py-2 px-4">{reminder.smsNo}</td>
              <td className="py-2 px-4">{reminder.status}</td>
              <td className="py-2 px-4">{/* Recurrence Frequency */}</td>
              <td className="py-2 px-4">
                <button className="bg-blue-500 text-white py-1 px-2 rounded-md">Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewReminders;
