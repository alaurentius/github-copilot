const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const rateLimit = require('express-rate-limit');
require('dotenv').config();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json({ limit: '5mb' }));
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many email requests from this IP, please try again later.'
});

app.post('/send-email', emailLimiter, async (req, res) => {
  const { email, image } = req.body;
  if (!email || !image) return res.status(400).send('Missing email or image');

  console.log('Received email:', email);

  const API_KEY = process.env.RESEND_API_KEY;
  const EMAIL = process.env.EMAIL;

  // Create transporter (use environment variables for credentials in production)
  let transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 587,
      secure: false, 
      auth: {
        user: 'resend',
        pass: API_KEY, 
      }
    });

  let mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Your Chart Image',
    text: 'Attached is your chart image.',
    attachments: [
      {
        filename: 'chart.png',
        content: image.split("base64,")[1],
        encoding: 'base64'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email sent!');
  } catch (err) {
    res.status(500).send('Failed to send email');
    console.error('Email error:', err);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));