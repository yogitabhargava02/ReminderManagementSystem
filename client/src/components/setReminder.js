import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SetReminder = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    subject: '',
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? { ...prevData[name], [value]: checked } : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend API
    try {
      const response = await fetch('http://localhost:3000/api/reminder/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Display a success toast
        toast.success('Reminder created successfully!');

        // Redirect to the View route after a delay
        setTimeout(() => {
          navigate('/view');
        }, 2000);
      } else {
        // Display an error toast
        toast.error('Failed to create reminder');
      }
    } catch (error) {
      // Display an error toast
      toast.error('Error creating reminder');
    }
  };

  const handleBack = () => {
    // Implement logic to go back to the previous page or route
    // For example: navigate(-1);
  };

  const handleConfirm = () => {
    // Implement logic for the confirmation action
    // This can include additional validation or processing
    console.log('Confirmed!');
  };
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />

    <div className="min-h-screen flex items-center justify-center text-white pt-4 pb-6">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6  rounded-lg shadow-md w-96 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Set a New Reminder</h1>

        {/* Date Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Select a Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Subject:</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select a Subject</option>
            <option value="subject1">Subject 1</option>
            <option value="subject2">Subject 2</option>
            
          </select>
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Add Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Contact No:</label>
          <input
            type="tel"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* SMS No Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">SMS No:</label>
          <input
            type="tel"
            name="smsNo"
            value={formData.smsNo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Recurrence Checkboxes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Recur for next:</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="recurrence"
              value="days7"
              checked={formData.recurrence.days7}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm mr-4">7 Days</label>

            <input
              type="checkbox"
              name="recurrence"
              value="days5"
              checked={formData.recurrence.days5}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm mr-4">5 Days</label>

            <input
              type="checkbox"
              name="recurrence"
              value="days3"
              checked={formData.recurrence.days3}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm mr-4">3 Days</label>

            <input
              type="checkbox"
              name="recurrence"
              value="days2"
              checked={formData.recurrence.days2}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">2 Days</label>
          </div>
        </div>
        <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
            >
              Confirm
            </button>
          </div>

  
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4">
          Create Reminder
        </button>
      </form>
    </div>
    </>
  );
};


export default SetReminder;
