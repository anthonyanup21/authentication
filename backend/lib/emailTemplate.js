export const verificationTokenTemplate = (username, verificationToken) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Verification Code</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table align="center" width="100%" style="max-width: 600px; background: white; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
        <h1>Your Verification Code</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; color: #333;">
        <p>Hi <strong>${username}</strong>,</p>
        <p>We received a request to verify your account. Use the code below to complete your verification:</p>
        <p style="text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; color: #4CAF50;">
          ${verificationToken}
        </p>
        <p style="color: #777;">This code will expire in <strong>24 hours</strong>. If you did not request this, you can ignore this email.</p>
      </td>
    </tr>
   
  </table>
</body>
</html>
`;


export const resetPasswordTemplate = (username, resetLink) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table align="center" width="100%" style="max-width: 600px; background: white; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <tr>
      <td style="background-color: #d9534f; padding: 20px; text-align: center; color: white;">
        <h1>Password Reset Request</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 20px; color: #333;">
        <p>Hi <strong>${username}</strong>,</p>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <p style="text-align: center;">
          <a href="${resetLink}" 
             style="background-color: #d9534f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p>If you didn’t request this, you can safely ignore this email. This link will expire in <strong>10 minutes</strong>.</p>
      </td>
    </tr>

    <!-- Footer -->
   
  </table>
</body>
</html>
`;


export const passwordResetSuccessTemplate = (username) => `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4CAF50; padding: 15px; text-align: center; color: white;">
        <h2>Password Reset Successful</h2>
      </div>
      <div style="padding: 20px; color: #333;">
        <p>Hi <strong>${username}</strong>,</p>
        <p>Your password has been successfully reset. You can now log in to your account using your new password.</p>
        <p>If you did not make this change, please contact our support team immediately.</p>
        <br/>
        <p>Thank you,<br/>The Support Team</p>
      </div>
      <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #777;">
        This is an automated message. Please do not reply.
      </div>
    </div>
  </div>
`;

