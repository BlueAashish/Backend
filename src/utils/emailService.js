const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASSWORD, // your app password
  },
});

// Email templates
const emailTemplates = {
  userCredentials: (userData) => ({
    subject: "Welcome to BlueTrack Technologies - Your Login Credentials",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0;">BlueTrack Technologies</h1>
            <p style="color: #7f8c8d; margin: 10px 0 0 0;">Technology You Can Trust , Progress You Can Measure </p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Welcome, ${
              userData.name
            }!</h2>
            <p style="color: #34495e; line-height: 1.6; margin-bottom: 20px;">
              Your account has been successfully created. Below are your login credentials:
            </p>
          </div>
          
          <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px;">Login Credentials</h3>
            <div style="margin-bottom: 10px;">
              <strong style="color: #34495e;">Email:</strong> 
              <span style="color: #7f8c8d;">${userData.email}</span>
            </div>
            <div style="margin-bottom: 10px;">
              <strong style="color: #34495e;">Password:</strong> 
              <span style="color: #e74c3c; font-family: monospace; background-color: #fdf2f2; padding: 2px 6px; border-radius: 3px;">${
                userData.password
              }</span>
            </div>
          </div>
          
          
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${
              process.env.FRONTEND_URL ||
              "https://admin.bluetracktechnologies.com"
            }" 
               style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Login to Your Account
            </a>
          </div>
          
          <div style="border-top: 1px solid #ecf0f1; padding-top: 20px; text-align: center;">
            <p style="color: #7f8c8d; margin: 0; font-size: 14px;">
              If you have any questions, please contact our support team.
            </p>
            <p style="color: #7f8c8d; margin: 5px 0 0 0; font-size: 14px;">
              © 2024 BlueTrack Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `,
  }),
};

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    const emailContent = emailTemplates[template](data);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

// Send user credentials email
const sendUserCredentials = async (userData) => {
  return await sendEmail(userData.email, "userCredentials", userData);
};

module.exports = {
  sendEmail,
  sendUserCredentials,
};
