import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!process.env.SMTP_USER) {
    console.log(`[Email Mock] To: ${to}, Subject: ${subject}`);
    return;
  }
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'NayePankh Foundation <noreply@nayepankh.org>',
    to,
    subject,
    html,
  });
};

export const sendOTPEmail = async (email: string, otp: string) => {
  await sendEmail(
    email,
    'Verify Your Email - NayePankh Foundation',
    `<div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563EB;">NayePankh Foundation</h2>
      <p>Your verification code is:</p>
      <h1 style="color: #14B8A6; letter-spacing: 8px;">${otp}</h1>
      <p>This code expires in 10 minutes.</p>
    </div>`
  );
};

export const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
  await sendEmail(
    email,
    'Reset Your Password - NayePankh Foundation',
    `<div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563EB;">Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Reset Password</a>
      <p>This link expires in 1 hour.</p>
    </div>`
  );
};

export const sendVolunteerApprovalEmail = async (email: string, name: string, approved: boolean) => {
  const status = approved ? 'approved' : 'rejected';
  await sendEmail(
    email,
    `Volunteer Application ${approved ? 'Approved' : 'Update'} - NayePankh Foundation`,
    `<div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563EB;">Hello ${name},</h2>
      <p>Your volunteer application has been <strong>${status}</strong>.</p>
      ${approved ? '<p>Welcome to the NayePankh family! Log in to your dashboard to get started.</p>' : '<p>Thank you for your interest. Please contact us for more information.</p>'}
    </div>`
  );
};
