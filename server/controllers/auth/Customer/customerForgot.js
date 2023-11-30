const Customer = require('../../../models/CustomerSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;


const sendResetPasswordEmail = async (customer, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.APP_USER,  
        pass: process.env.PASS,  
      },
    });

    const resetLink = `http://your-app-domain.com/reset-password?token=${resetToken}`;

    const mailOptions = await transporter.sendMail({
      from: '"Yogita Bhargava 👻" <your-gmail-email@gmail.com>',
      to: customer.email,
      subject: 'Reset Your Password',
      html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    console.log(`Message sent: ${mailOptions.messageId}`);
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw error;
  }
};

const initiateForgotPassword = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    
    const customer = await Customer.findOne({ mobileNumber });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

   
    const resetToken = jwt.sign({ mobileNumber: customer.mobileNumber }, secretKey, { expiresIn: '1h' });

   
    await sendResetPasswordEmail(customer, resetToken);

    res.status(200).json({ message: 'Reset token generated successfully' });
  } catch (error) {
    console.error('Error initiating forgot password process:', error);
    res.status(500).json({ error: 'Failed to initiate forgot password process' });
  }
};

module.exports = {
  initiateForgotPassword,
};
