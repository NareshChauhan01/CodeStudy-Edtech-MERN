exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Updated Successfully</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                background-color: #f5f5f5;
                font-family: 'Inter', Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #1C1C1C;
                margin: 0;
                padding: 0;
            }
    
            .email-wrapper {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                margin-top: 20px;
                margin-bottom: 20px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            }
            
            .email-header {
                background: linear-gradient(to right, #1A1A1A, #2C333F);
                padding: 30px 20px;
                text-align: center;
            }
            
            .logo {
                max-width: 180px;
                margin: 0 auto;
            }
            
            .header-banner {
                background-color: #2C333F;
                color: #ffffff;
                padding: 30px 20px 50px;
                text-align: center;
                position: relative;
            }
            
            .header-banner:after {
                content: "";
                position: absolute;
                bottom: -20px;
                left: 0;
                right: 0;
                height: 40px;
                background-color: #ffffff;
                border-radius: 100% 100% 0 0 / 100% 100% 0 0;
            }
            
            .status-badge {
                background-color: #4CAF50;
                color: #ffffff;
                font-size: 14px;
                font-weight: 600;
                padding: 6px 16px;
                border-radius: 50px;
                margin-bottom: 20px;
                display: inline-block;
            }
            
            .header-title {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                color: #ffffff;
            }
            
            .header-subtitle {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);
                max-width: 480px;
                margin: 0 auto;
            }
            
            .content-wrapper {
                padding: 40px 30px;
                text-align: left;
            }
            
            .account-info {
                background-color: #F9F9F9;
                border-radius: 12px;
                padding: 20px;
                margin: 24px 0;
                border-left: 4px solid #FFD60A;
            }
            
            .info-label {
                font-weight: 500;
                color: #666666;
                display: block;
                margin-bottom: 6px;
            }
            
            .info-value {
                color: #1C1C1C;
                font-weight: 600;
                word-break: break-all;
            }
            
            .warning-block {
                background-color: rgba(255, 87, 87, 0.1);
                border-radius: 12px;
                padding: 16px 20px;
                margin-top: 24px;
                border-left: 4px solid #FF5757;
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }
            
            .warning-icon {
                color: #FF5757;
                font-size: 24px;
                line-height: 1;
            }
            
            .warning-text {
                flex: 1;
                font-size: 14px;
                color: #333;
            }
            
            .divider {
                height: 1px;
                background-color: #efefef;
                margin: 30px 0;
            }
            
            .cta-wrapper {
                text-align: center;
                margin: 30px 0;
            }
            
            .cta-button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #2C333F;
                color: #FFFFFF !important;
                text-decoration: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .footer {
                background-color: #F9F9F9;
                padding: 30px 20px;
                text-align: center;
                color: #666666;
                border-top: 1px solid #efefef;
            }
            
            .social-links {
                margin: 20px 0;
            }
            
            .social-icon {
                display: inline-block;
                margin: 0 10px;
            }
            
            .footer-text {
                font-size: 14px;
                margin-bottom: 10px;
            }
            
            .support-link {
                color: #007BFF;
                text-decoration: none;
            }
            
            @media only screen and (max-width: 600px) {
                .email-wrapper {
                    width: 100%;
                    border-radius: 0;
                    margin-top: 0;
                    margin-bottom: 0;
                }
                
                .header-title {
                    font-size: 24px;
                }
                
                .content-wrapper {
                    padding: 30px 20px;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="email-wrapper">
            <div class="email-header">
                <a href="https://CodeStudy-iota-rouge.vercel.app">
                    <img class="logo" src="https://res.cloudinary.com/dqhv83qhg/image/upload/v1746085347/Logo-Full-Light_wbydhl.png" alt="CodeStudy Logo">
                </a>
            </div>
            
            <div class="header-banner">
                <div class="status-badge">Success</div>
                <h1 class="header-title">Password Updated</h1>
                <p class="header-subtitle">Your account security has been updated successfully.</p>
            </div>
            
            <div class="content-wrapper">
                <p>Hello ${name},</p>
                <p style="margin-top: 15px;">This email confirms that your CodeStudy account password was recently changed. The update has been successfully applied to your account.</p>
                
                <div class="account-info">
                    <span class="info-label">Account email</span>
                    <span class="info-value">${email}</span>
                </div>
                
                <div class="warning-block">
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-text">
                        <strong>Didn't change your password?</strong><br>
                        If you didn't request this password change, please contact our support team immediately to secure your account.
                    </div>
                </div>
                
                <div class="cta-wrapper">
                    <a href="https://CodeStudy-iota-rouge.vercel.app/login" class="cta-button">Login to Your Account</a>
                </div>
                
                <div class="divider"></div>
                
                <p>For security purposes, we recommend that you:</p>
                <ul style="margin-top: 10px; margin-left: 20px;">
                    <li>Use a unique password that you don't use for other websites</li>
                    <li>Never share your password with anyone</li>
                    <li>Enable two-factor authentication if available</li>
                </ul>
                
                <p style="margin-top: 20px;">Thank you for helping us keep your account secure.</p>
                
                <p style="margin-top: 20px;">Best regards,</p>
                <p><strong>The CodeStudy Team</strong></p>
            </div>
            
            <div class="footer">
                <div class="social-links">
                    <a href="#" class="social-icon">
                        <img src="https://img.icons8.com/?size=100&id=ClbD5JTFM7FA&format=png&color=000000" alt="Twitter" width="24">
                    </a>

                    <a href="#" class="social-icon">
                        <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="Facebook" width="24">
                    </a>

                    <a href="#" class="social-icon">
                        <img src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000" alt="Instagram" width="24">
                    </a>

                    <a href="#" class="social-icon">
                        <img src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000" alt="LinkedIn" width="24">
                    </a>
                </div>
                
                <p class="footer-text">Need help? <a href="mailto:support@CodeStudy.com" class="support-link">Contact our support team</a></p>
                <p class="footer-text">© 2025 CodeStudy. All rights reserved.</p>
                <p class="footer-text" style="margin-top: 15px; font-size: 12px; color: #999;">
                    <a href="#" style="color: #666; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #666; margin: 0 10px;">Terms of Service</a>
                </p>
            </div>
        </div>
    </body>
    
    </html>`;
};