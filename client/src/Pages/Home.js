import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus && storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      fetchUsername();
    }
  }, []);

  const fetchUsername = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/customer/get-username', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        console.error('Failed to fetch username');
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    fetchUsername();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setUsername('');
  };

  const redirectTo = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-pink min-h-screen flex items-center justify-center text-white">
      {isLoggedIn ? (
        <div className="bg-gray-100 p-8 rounded-lg shadow-md w-96 text-gray-800">
          <h1 className="text-3xl font-bold mb-4">Welcome, {username}!</h1>
          <p className="text-gray-600 mb-8">Today is Tuesday, 14th Of February.</p>
          <div className="grid grid-cols-1 gap-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => redirectTo('/home/set-reminder')}>
              Set Reminder
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => redirectTo('/home/view-reminders')}>
              View Reminders
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => redirectTo('/home/modify-reminder')}>
              Modify Reminder
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => redirectTo('/home/disable-reminder')}>
              Disable Reminder
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => redirectTo('/home/delete-reminder')}>
              Delete Reminder
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => redirectTo('/home/enable-reminder')}>
              Enable Reminder
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">Welcome to the Reminder Application</h1>
          <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
