exports.accountDeletionTemplate = (name) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Deleted | CodeStudy</title>
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
                background-color: #E53935;
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
            
            .info-box {
                background-color: #F9F9F9;
                border-radius: 12px;
                padding: 24px;
                margin: 24px 0;
                border-left: 4px solid #E53935;
            }
            
            .checkmark-container {
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
                position: relative;
            }
            
            .checkmark-circle {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                display: block;
                stroke-width: 2;
                stroke: #E53935;
                stroke-miterlimit: 10;
                box-shadow: inset 0px 0px 0px #E53935;
                animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
                position: relative;
                top: 5px;
                right: 5px;
                margin: 0 auto;
            }
            
            .checkmark-check {
                width: 50px;
                height: 50px;
                position: absolute;
                stroke-width: 2;
                stroke: #fff;
                stroke-miterlimit: 10;
                transform: translateX(15px) translateY(15px);
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards;
            }
            
            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }
            
            @keyframes scale {
                0%, 100% {
                    transform: none;
                }
                50% {
                    transform: scale3d(1.1, 1.1, 1);
                }
            }
            
            @keyframes fill {
                100% {
                    box-shadow: inset 0px 0px 0px 50px #E53935;
                }
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
            
            .secondary-cta {
                display: inline-block;
                margin-top: 15px;
                color: #666666;
                text-decoration: underline;
                font-size: 14px;
            }
            
            .features-section {
                margin: 30px 0;
            }
            
            .feature-item {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .feature-icon {
                width: 40px;
                height: 40px;
                background-color: rgba(44, 51, 63, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                flex-shrink: 0;
            }
            
            .feature-content {
                flex-grow: 1;
            }
            
            .feature-title {
                font-weight: 600;
                margin-bottom: 4px;
                color: #1C1C1C;
            }
            
            .feature-desc {
                font-size: 14px;
                color: #666666;
                margin: 0;
            }
            
            .divider {
                height: 1px;
                background-color: #efefef;
                margin: 30px 0;
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
                <p>CodeStudy</p>
            </div>
            
            <div class="header-banner">
                <div class="status-badge">Account Deleted</div>
                <h1 class="header-title">Farewell from CodeStudy</h1>
                <p class="header-subtitle">Your account has been permanently deleted</p>
            </div>
            
            <div class="content-wrapper">
                <p>Hello ${name},</p>
                <p style="margin-top: 15px;">We're sorry to see you go. As requested, your CodeStudy account has been permanently deleted from our system, along with all associated data.</p>
                
                <div class="checkmark-container">
                    <svg class="checkmark-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
                
                <div class="info-box">
                    <h3 style="margin-bottom: 15px;">What this means:</h3>
                    <ul style="padding-left: 20px; margin-bottom: 0;">
                        <li>Your profile information has been removed</li>
                        <li>Your enrollment history has been deleted</li>
                        <li>Your payment information has been removed</li>
                        <li>All personal data has been purged from our systems</li>
                    </ul>
                </div>
                
                <p style="margin-top: 20px;">If you deleted your account by mistake or wish to rejoin CodeStudy in the future, you'll need to create a new account. Your previous data cannot be recovered.</p>
                
                <div class="features-section">
                    <h3 style="margin-bottom: 20px;">We hope you'll consider joining us again!</h3>
                    
                    <div class="feature-item">
                        <div class="feature-icon">
                            <img src="https://img.icons8.com/?size=100&id=113845&format=png&color=000000" alt="Courses" width="24">
                        </div>

                        <div class="feature-content">
                            <h4 class="feature-title">Expanding Course Library</h4>
                            <p class="feature-desc">We're constantly adding new courses from industry experts</p>
                        </div>
                    </div>
                    
                    <div class="feature-item">
                        <div class="feature-icon">
                            <img src="https://img.icons8.com/?size=100&id=UWNhN9bLYG1k&format=png&color=000000" alt="Community" width="24">
                        </div>
                        <div class="feature-content">
                            <h4 class="feature-title">Growing Community</h4>
                            <p class="feature-desc">Connect with thousands of learners on the same journey</p>
                        </div>
                    </div>
                    
                    <div class="feature-item">
                        <div class="feature-icon">
                            <img src="https://img.icons8.com/?size=100&id=a6dmGwkzqrCS&format=png&color=000000" alt="Certificate" width="24">
                        </div>
                        <div class="feature-content">
                            <h4 class="feature-title">Industry-Recognized Certificates</h4>
                            <p class="feature-desc">Boost your career with our professional certifications</p>
                        </div>
                    </div>
                </div>
                
                <div class="cta-wrapper">
                    <a href="https://CodeStudy-iota-rouge.vercel.app/signup" class="cta-button">Create New Account</a>
                    <br>
                    <a href="https://CodeStudy-iota-rouge.vercel.app/contact" class="secondary-cta">Provide Feedback</a>
                </div>
                
                <div class="divider"></div>
                
                <p>Thank you for being part of our community. If you have any questions regarding your account deletion or wish to share your reason for leaving, we're always here to listen.</p>
                
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
                
                <p class="footer-text">Questions? <a href="mailto:support@CodeStudy.com" class="support-link">Contact our support team</a></p>
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