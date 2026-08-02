const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your StudyNotion Account</title>
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
            
            .verification-badge {
                background-color: #FFD60A;
                color: #000000;
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
            
            .otp-container {
                background-color: #F9F9F9;
                border-radius: 12px;
                padding: 24px;
                margin: 24px 0;
                text-align: center;
                border-left: 4px solid #FFD60A;
            }
            
            .otp-label {
                font-size: 14px;
                font-weight: 500;
                color: #666666;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .otp-code {
                font-size: 36px;
                font-weight: 700;
                color: #2C333F;
                letter-spacing: 6px;
                margin: 0;
            }
            
            .otp-expires {
                font-size: 14px;
                color: #666666;
                margin-top: 12px;
            }
            
            .divider {
                height: 1px;
                background-color: #efefef;
                margin: 30px 0;
            }
            
            .instructions {
                background-color: rgba(255, 214, 10, 0.1);
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
                border-left: 4px solid #FFD60A;
            }
            
            .instructions-title {
                font-weight: 600;
                margin-bottom: 10px;
                color: #2C333F;
                font-size: 16px;
            }
            
            .instructions-list {
                margin-left: 20px;
                margin-bottom: 0;
            }
            
            .instructions-list li {
                margin-bottom: 8px;
            }
            
            .instructions-list li:last-child {
                margin-bottom: 0;
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
                
                .otp-code {
                    font-size: 30px;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="email-wrapper">
            <div class="email-header">
                <p>Code Study</p>
            </div>
            
            <div class="header-banner">
                <div class="verification-badge">Verification Required</div>
                <h1 class="header-title">Verify Your Account</h1>
                <p class="header-subtitle">Please use the verification code below to complete your registration.</p>
            </div>
            
            <div class="content-wrapper">
                <p>Hello there,</p>
                <p style="margin-top: 15px;">Thank you for choosing Code Study! To ensure the security of your account, we need to verify your email address.</p>
                
                <div class="otp-container">
                    <div class="otp-label">Your verification code</div>
                    <div class="otp-code">${otp}</div>
                    <div class="otp-expires">Valid for 5 minutes only</div>
                </div>
                
                <p>Enter this code on the verification page to activate your account. If you didn't request this code, you can safely ignore this email.</p>
                
                <div class="instructions">
                    <h3 class="instructions-title">Next steps:</h3>
                    <ol class="instructions-list">
                        <li>Enter the verification code shown above</li>
                        <li>Complete your profile setup</li>
                        <li>Start exploring courses on Code Study</li>
                    </ol>
                </div>
                
                <div class="divider"></div>
                
                <p style="margin-bottom: 15px;">If you're having trouble with the verification process, please contact our support team for assistance.</p>
                
                <p style="margin-top: 20px;">Best regards,</p>
                <p><strong>The Code Study Team</strong></p>
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
                
                <p class="footer-text">Need help? <a href="mailto:support@codestudy.com" class="support-link">Contact our support team</a></p>
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

module.exports = otpTemplate;