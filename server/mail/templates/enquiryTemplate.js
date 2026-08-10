exports.enquiryTemplate = (
  firstName,
  lastName,
  email,
  phone,
  message
) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Confirmation</title>
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
                background: #2C333F;
                color: #ffffff;
                padding: 30px 20px;
                text-align: center;
                position: relative;
            }
            
            .header-banner:after {
                content: "";
                position: absolute;
                bottom: -15px;
                left: 0;
                right: 0;
                height: 30px;
                background: #ffffff;
                border-radius: 50% 50% 0 0;
            }
            
            .confirmation-badge {
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
                font-size: 24px;
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
            
            .details-card {
                background-color: #F9F9F9;
                border-radius: 12px;
                padding: 24px;
                margin: 24px 0;
                border-left: 4px solid #FFD60A;
            }
            
            .detail-row {
                display: flex;
                margin-bottom: 12px;
                align-items: flex-start;
            }
            
            .detail-row:last-child {
                margin-bottom: 0;
            }
            
            .detail-label {
                font-weight: 500;
                width: 120px;
                color: #666666;
                flex-shrink: 0;
            }
            
            .detail-value {
                color: #1C1C1C;
                flex-grow: 1;
            }
            
            .message-box {
                background-color: #F9F9F9;
                border-radius: 12px;
                padding: 20px;
                margin-top: 24px;
                border-left: 4px solid #FFD60A;
            }
            
            .message-label {
                font-weight: 500;
                color: #666666;
                margin-bottom: 8px;
            }
            
            .cta-wrapper {
                text-align: center;
                margin: 30px 0;
            }
            
            .cta-button {
                display: inline-block;
                padding: 12px 28px;
                background-color: #FFD60A;
                color: #000000 !important;
                text-decoration: none;
                border-radius: 8px;
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
            
            .divider {
                height: 1px;
                background-color: #efefef;
                margin: 30px 0;
            }
            
            @media only screen and (max-width: 600px) {
                .email-wrapper {
                    width: 100%;
                    border-radius: 0;
                    margin-top: 0;
                    margin-bottom: 0;
                }
                
                .header-title {
                    font-size: 22px;
                }
                
                .content-wrapper {
                    padding: 30px 20px;
                }
                
                .detail-row {
                    flex-direction: column;
                }
                
                .detail-label {
                    width: 100%;
                    margin-bottom: 4px;
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
                <div class="confirmation-badge">Enquiry Received</div>
                <h1 class="header-title">Thanks for Reaching Out!</h1>
                <p class="header-subtitle">We've received your message and will get back to you soon.</p>
            </div>
            
            <div class="content-wrapper">
                <p>Hello ${firstName},</p>
                <p style="margin-top: 16px;">Thank you for contacting CodeStudy. We've received your enquiry and our team is reviewing it. We typically respond within 24-48 hours on business days.</p>
                
                <div class="details-card">
                    <h3 style="margin-bottom: 16px; color: #2C333F;">Your Contact Information</h3>
                    
                    <div class="detail-row">
                        <div class="detail-label">Name</div>
                        <div class="detail-value">${firstName} ${lastName}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${email}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Phone</div>
                        <div class="detail-value">${phone || 'Not provided'}</div>
                    </div>
                </div>
                
                <div class="message-box">
                    <div class="message-label">Your Message</div>
                    <div style="white-space: pre-wrap;">${message}</div>
                </div>
                
                <div class="cta-wrapper">
                    <p style="margin-bottom: 16px;">While you wait for our response, you might find what you're looking for in our resources:</p>
                    <a href="https://CodeStudy-iota-rouge.vercel.app/courses" class="cta-button">Browse Our Courses</a>
                </div>
                
                <div class="divider"></div>
                
                <p>If your enquiry is urgent, please don't hesitate to call us directly at <strong>(123) 456-7890</strong> during our business hours (Mon-Fri, 9 AM - 5 PM).</p>
                
                <p style="margin-top: 20px;">Best regards,</p>
                <p style="margin-top: 4px;"><strong>The CodeStudy Team</strong></p>
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
                
                <p class="footer-text">Need more help? <a href="mailto:support@CodeStudy.com" class="support-link">Contact our support team</a></p>
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