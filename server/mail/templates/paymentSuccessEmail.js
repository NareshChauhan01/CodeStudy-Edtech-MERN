exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation</title>
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
            
            .payment-card {
                background-color: #F9F9F9;
                border-radius: 12px;
                padding: 24px;
                margin: 24px 0;
                border-left: 4px solid #FFD60A;
            }
            
            .payment-amount {
                text-align: center;
                padding: 20px 0;
                margin-bottom: 20px;
                border-bottom: 1px solid #efefef;
            }
            
            .amount {
                font-size: 32px;
                font-weight: 700;
                color: #2C333F;
            }
            
            .currency {
                font-size: 18px;
                font-weight: 600;
                color: #2C333F;
            }
            
            .payment-detail {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #efefef;
            }
            
            .payment-detail:last-child {
                border-bottom: none;
            }
            
            .detail-label {
                color: #666666;
                font-weight: 500;
            }
            
            .detail-value {
                font-weight: 600;
                color: #1C1C1C;
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
                background-color: #FFD60A;
                color: #000000 !important;
                text-decoration: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                transition: all 0.3s ease;
                text-align: center;
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
                
                .amount {
                    font-size: 28px;
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
                <div class="status-badge">Payment Successful</div>
                <h1 class="header-title">Thank You for Your Purchase!</h1>
                <p class="header-subtitle">Your transaction has been completed successfully.</p>
            </div>
            
            <div class="content-wrapper">
                <p>Hello ${name},</p>
                <p style="margin-top: 15px;">Thank you for your purchase with CodeStudy. We're excited to confirm that your payment has been successfully processed.</p>
                
                <div class="payment-card">
                    <div class="payment-amount">
                        <span class="currency">₹</span>
                        <span class="amount">${amount}</span>
                    </div>
                    
                    <div class="payment-detail">
                        <div class="detail-label">Payment ID</div>
                        <div class="detail-value">${paymentId}</div>
                    </div>
                    
                    <div class="payment-detail">
                        <div class="detail-label">Order ID</div>
                        <div class="detail-value">${orderId}</div>
                    </div>
                    
                    <div class="payment-detail">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                    
                    <div class="payment-detail">
                        <div class="detail-label">Payment Method</div>
                        <div class="detail-value">Online Payment</div>
                    </div>
                </div>
                
                <div class="cta-wrapper">
                    <a href="https://CodeStudy-iota-rouge.vercel.app/dashboard/enrolled-courses" class="cta-button">View My Courses</a>
                </div>
                
                <div class="divider"></div>
                
                <p>You can access your purchased courses immediately by logging into your account. If you encounter any issues or have questions, please don't hesitate to reach out to our support team.</p>
                
                <p style="margin-top: 20px;">Thank you for choosing CodeStudy for your learning journey!</p>
                
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
                
                <p class="footer-text">Need help? <a href="mailto:info@CodeStudy.com" class="support-link">Contact our support team</a></p>
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