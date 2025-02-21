const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer"); // Import Nodemailer
require("dotenv").config(); //  Load .env variables

// Route for About Us page
router.get('/aboutus', (req, res) => {
    res.render('aboutus');  // Renders aboutus.ejs
});
// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // Feedback Route
  router.post("/submit-feedback", async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      // Email Options
      const mailOptions = {
        from: email, // Sender email
        to: "khanalsanjana01@gmail.com", // Your email
        subject: "New Feedback Received",
        text: `You have received new feedback:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };
  
      // Send Email
      await transporter.sendMail(mailOptions);
  
      res.send("Thank you for your feedback! We will get back to you soon.");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("An error occurred while sending feedback.");
    }
  });

  module.exports = router;

