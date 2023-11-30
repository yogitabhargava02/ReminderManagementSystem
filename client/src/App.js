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
          <Route path="/register" element={<ReminderRegister />} />
          <Route path="/set-reminder" element={<SetReminder />} />
          <Route path="/modify-reminder" element={<ModifyReminder />} />
          <Route path="/disable-reminder" element={<DisableReminder />} />
          <Route path="/delete-reminder" element={<DeleteReminder />} />
          <Route path="/enable-reminder" element={<EnableReminder />} />
          <Route path="/view-reminders" element={<ViewReminders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
