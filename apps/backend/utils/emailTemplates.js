export const verifyEmailTemplate = (name, url) => `
  <div style="font-family: Arial; padding:20px;">
    <h2>Hello ${name},</h2>
    <p>Welcome to <strong>ArtisanBazaar</strong>! Please verify your email to activate your account.</p>
    
    <a href="${url}" 
       style="display:inline-block; padding:10px 18px; background:#000; color:#fff; 
       text-decoration:none; border-radius:6px; margin-top:10px;">
       Verify Email
    </a>

    <p style="margin-top:20px; font-size:14px;">If you didn’t request this, please ignore this email.</p>
  </div>
`;

export const resetPasswordTemplate = (name, url) => `
  <div style="font-family: Arial; padding:20px;">
    <h2>Hello ${name},</h2>
    <p>You requested to reset your password.</p>

    <a href="${url}" 
       style="display:inline-block; padding:10px 18px; background:#000; color:#fff;
       text-decoration:none; border-radius:6px; margin-top:10px;">
       Reset Password
    </a>

    <p style="margin-top:20px; font-size:14px;">If you didn’t request this, ignore this email.</p>
  </div>
`;
