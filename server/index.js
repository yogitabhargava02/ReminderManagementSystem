const express = require('express');
const app = express();
const PORT =3000;
const cors = require('cors');


// Enable CORS for all routes
app.use(cors());
const customerRoutes = require('./routes/customerRoute');
const reminderRoutes = require('./routes/reminderRoute'); // Import the reminder routes
require("./config/database");

app.use(express.json());

app.use('/api/customer', customerRoutes);
app.use('/api/reminder', reminderRoutes); // Use the reminder routes under /api/reminder

app.get('/reset-password', (req, res) => {
    res.send('Reset Password Page'); 
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
