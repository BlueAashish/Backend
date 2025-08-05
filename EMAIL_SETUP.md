# 📧 Email Service Setup Guide

## Environment Variables Required

Add these variables to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=https://admin.bluetracktechnologies.com
```

## Gmail Setup Instructions

### 1. Enable 2-Factor Authentication

- Go to your Google Account settings
- Enable 2-Factor Authentication

### 2. Generate App Password

- Go to Google Account → Security
- Under "2-Step Verification", click "App passwords"
- Select "Mail" and "Other (Custom name)"
- Enter a name like "BlueTrack API"
- Copy the generated 16-character password

### 3. Update Environment Variables

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

## Other Email Providers

### Outlook/Hotmail

```javascript
// In emailService.js, change the service:
const transporter = nodemailer.createTransporter({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### Custom SMTP Server

```javascript
const transporter = nodemailer.createTransporter({
  host: "your-smtp-server.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Testing the Email Service

### 1. Create a test user

```bash
curl -X POST https://your-ngrok-url.ngrok.io/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }'
```

### 2. Check response

The API will return:

```json
{
  "success": true,
  "data": {
    /* user data */
  },
  "password": "generated-password",
  "emailSent": true,
  "message": "User created successfully and credentials sent via email"
}
```

## Email Template Features

- ✅ Professional HTML design
- ✅ Responsive layout
- ✅ Company branding
- ✅ Security notice
- ✅ Login button
- ✅ Contact information

## Troubleshooting

### Common Issues:

1. **Authentication failed**

   - Check if 2FA is enabled
   - Verify app password is correct
   - Ensure email and password match

2. **Email not sending**

   - Check console logs for errors
   - Verify environment variables
   - Test SMTP connection

3. **Gmail blocking**
   - Enable "Less secure app access" (not recommended)
   - Use App Password instead
   - Check Gmail security settings

## Security Notes

- ⚠️ Never commit `.env` file to version control
- ⚠️ Use App Passwords, not regular passwords
- ⚠️ Regularly rotate app passwords
- ⚠️ Monitor email sending logs
