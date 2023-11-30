const Customer = require('../../../models/CustomerSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const customerRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(400).json({ message: 'This email is already registered' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
    });

    await newCustomer.save();

    const token = jwt.sign({ email: newCustomer.email, _id: newCustomer._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'Customer registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};
// customerController.js
const getCustomerUsername = async (req, res) => {
  try {
    // The authenticated user information is available in req.user after authentication
    const username = req.user.username;

    res.json({ username });
  } catch (error) {
    console.error('Error fetching username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getCustomerUsername,
  customerRegister,
};
