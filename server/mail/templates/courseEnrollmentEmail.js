exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Your New Course!</title>
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
                border-radius: 10px;
                overflow: hidden;
                margin-top: 20px;
                margin-bottom: 20px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            }
            
            .email-header {
                background: linear-gradient(to right, #1A1A1A, #2C333F);
                padding: 30px 20px;
                text-align: center;
                border-bottom: 1px solid #efefef;
            }
            
            .logo {
                max-width: 180px;
                margin: 0 auto;
            }
            
            .hero-section {
                background-color: #2C333F;
                color: #ffffff;
                padding: 40px 20px;
                text-align: center;
                position: relative;
            }
            
            .badge {
                background-color: #FFD60A;
                color: #000000;
                font-size: 14px;
                font-weight: 600;
                padding: 6px 16px;
                border-radius: 50px;
                margin-bottom: 20px;
                display: inline-block;
            }
            
            .message {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 16px;
                color: #ffffff;
            }
            
            .sub-message {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);
                max-width: 480px;
                margin: 0 auto 10px;
            }
            
            .content-wrapper {
                padding: 40px 30px;
                text-align: left;
            }
            
            .course-card {
                border: 1px solid #efefef;
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
                background-color: #fafafa;
                position: relative;
            }
            
            .course-name {
                font-size: 18px;
                font-weight: 600;
                color: #1C1C1C;
                margin-bottom: 10px;
                border-left: 3px solid #FFD60A;
                padding-left: 10px;
            }
            
            .course-info {
                font-size: 14px;
                color: #666666;
                margin-bottom: 8px;
            }
            
            .cta-wrapper {
                text-align: center;
                margin: 30px 0;
            }
            
            .cta {
                display: inline-block;
                padding: 12px 28px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                transition: all 0.3s ease;
                margin-top: 15px;
            }
            
            .secondary-cta {
                display: inline-block;
                margin-top: 15px;
                color: #666666;
                text-decoration: underline;
                font-size: 14px;
            }
            
            .feature-block {
                display: flex;
                margin: 30px 0;
                align-items: center;
            }
            
            .feature-icon {
                width: 50px;
                height: 50px;
                background-color: rgba(255, 214, 10, 0.1);
                border-radius: 10px;
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
                margin-bottom: 5px;
                color: #1C1C1C;
            }
            
            .feature-desc {
                font-size: 14px;
                color: #666666;
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
            
            .highlight {
                color: #000000;
                font-weight: 600;
            }
            
            .support-link {
                color: #007BFF;
                text-decoration: none;
            }
            
            .emoji {
                font-size: 18px;
                vertical-align: middle;
                margin-right: 3px;
            }
            
            @media only screen and (max-width: 600px) {
                .email-wrapper {
                    width: 100%;
                    border-radius: 0;
                }
                
                .message {
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
                    <img class="logo" src="https://res.cloudinary.com/dqhv83qhg/image/upload/v1746085347/Logo-Full-Light_wbydhl.png" alt="CodeStudy">
                </a>
            </div>
            
            <div class="hero-section">
                <div class="badge">Enrollment Confirmed</div>
                <h1 class="message">Welcome to Your New Course!</h1>
                <p class="sub-message">Your learning journey begins now.</p>
            </div>
            
            <div class="content-wrapper">
                <p>Hello ${name},</p>
                <p style="margin-top: 15px;">Great news! You've successfully enrolled in:</p>
                
                <div class="course-card">
                    <div class="course-name">${courseName}</div>
                    <div class="course-info">
                        <span class="emoji">🎯</span> Ready for your learning journey
                    </div>
                    <div class="course-info">
                        <span class="emoji">🔑</span> Full access granted
                    </div>
                </div>
                
                <div class="feature-block">
                    <div class="feature-icon">
                        <img alt="Lightning Bolt Icon" src="https://img.icons8.com/?size=100&id=rgJhaC1SnRm0&format=png&color=000000">
                    </div>

                    <div class="feature-content">
                        <h3 class="feature-title">Start Learning Immediately</h3>
                        <p class="feature-desc">Access your course materials right away and begin your educational journey.</p>
                    </div>
                </div>
                
                <div class="feature-block">
                    <div class="feature-icon">
                        <img alt="Education Icon" src="https://img.icons8.com/?size=100&id=kyonAJDT8Lp6&format=png&color=000000">
                    </div>
                    <div class="feature-content">
                        <h3 class="feature-title">Expert Instruction</h3>
                        <p class="feature-desc">Learn from industry experts who provide clear explanations and practical insights.</p>
                    </div>
                </div>
                
                <div class="feature-block">
                    <div class="feature-icon">
                        <img alt="Calendar Icon" src="https://img.icons8.com/?size=100&id=9P6qXkR4ssZX&format=png&color=000000">
                    </div>

                    <div class="feature-content">
                        <h3 class="feature-title">Learn at Your Own Pace</h3>
                        <p class="feature-desc">The course is available 24/7, so you can learn whenever it suits your schedule.</p>
                    </div>
                </div>
                
                <div class="cta-wrapper">
                    <p>Ready to start learning?</p>
                    <a class="cta" href="https://CodeStudy-iota-rouge.vercel.app/dashboard/enrolled-courses">Go to My Courses</a>
                </div>
                
                <div class="divider"></div>
                
                <p>We're excited to be part of your learning journey. If you need any assistance, our support team is just a click away.</p>
                <p style="margin-top: 15px;">Happy learning!</p>
                <p style="margin-top: 20px;">The CodeStudy Team</p>
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
                
                <p class="footer-text">Need help? <a href="mailto:info@CodeStudy.com" class="support-link">Contact our support team</a></p>
                <p class="footer-text">© 2025 CodeStudy. All rights reserved.</p>
                <p class="footer-text" style="margin-top: 15px; font-size: 12px;">
                    <a href="#" style="color: #666; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #666; margin: 0 10px;">Terms of Service</a> | 
                    <a href="#" style="color: #666; margin: 0 10px;">Unsubscribe</a>
                </p>
            </div>
        </div>
    </body>
    
    </html>`;
};