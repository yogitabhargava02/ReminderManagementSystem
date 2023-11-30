const Customer = require('../../../models/CustomerSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

   
    const decodedToken = jwt.verify(token, secretKey);

   
    if (!decodedToken || !decodedToken.mobileNumber) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    
    const customer = await Customer.findOneAndUpdate(
      { mobileNumber: decodedToken.mobileNumber },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    
    res.redirect('http://localhost:3000/reset-success');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Password reset failed' });
  }
};

module.exports = {
  resetPassword,
};
