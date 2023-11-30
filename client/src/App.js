// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReminderLogin from './components/auth/ReminderLogin';
import Home from './Pages/Home';
import ReminderRegister from './components/auth/ReminderRegister';
import SetReminder from './components/setReminder';
import ModifyReminder from './components/modifyReminder';
import DisableReminder from './components/disableReminder';
import DeleteReminder from './components/deleteReminder';
import EnableReminder from './components/enableReminder';
import ViewReminders from './components/viewReminders';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/login" element={<ReminderLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/register" element={<ReminderRegister />} />
          <Route path="/home/set-reminder" element={<SetReminder />} />
          <Route path="/home/modify-reminder" element={<ModifyReminder />} />
          <Route path="/home/disable-reminder" element={<DisableReminder />} />
          <Route path="/home/delete-reminder" element={<DeleteReminder />} />
          <Route path="/home/enable-reminder" element={<EnableReminder />} />
          <Route path="/home/view-reminders" element={<ViewReminders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
