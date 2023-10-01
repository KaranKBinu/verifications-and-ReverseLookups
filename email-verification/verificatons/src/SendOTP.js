import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './EmailOTPVerification.css'; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function EmailOTPVerification() {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [sentOTP, setSentOTP] = useState('');
    const [isOTPGenerated, setIsOTPGenerated] = useState(false); // Track OTP generation status
    const [isEmailSent, setIsEmailSent] = useState(false); // Track email sending status

    const generateOTP = () => {
        if (!email) {
            setVerificationMessage('Email field cannot be blank');
            return;
        }

        const newOTP = Math.floor(100000 + Math.random() * 900000);
        setOTP(newOTP.toString());
        setSentOTP(newOTP.toString());
        sendEmail(email, newOTP);
        setIsOTPGenerated(true);
        setIsEmailSent(true); // Email is sent when OTP is generated
        setVerificationMessage('');
    };

    const sendEmail = (toEmail, otp) => {
        const serviceId = 'ADD_SERVICE_ID';
        const templateId = 'ADD_TEMPLATE_ID';
        const userId = 'ADD_USER_ID';

        emailjs
            .send(serviceId, templateId, {
                to_email: toEmail,
                otp: otp,
            }, userId)
            .then(
                (response) => {
                    console.log('Email sent:', response);
                    setVerificationMessage('Email sent successfully');
                },
                (error) => {
                    console.error('Email error:', error);
                    setVerificationMessage('Error sending OTP via email');
                }
            );
        setOTP('');
    };

    const verifyOTP = () => {
        if (!otp) {
            setVerificationMessage('OTP field cannot be blank');
            return;
        }

        if (otp === sentOTP) {
            setVerificationMessage('OTP Verified');
        } else {
            setVerificationMessage('Invalid OTP');
        }

        setOTP('');
    };

    const resendOTP = () => {
        setIsEmailSent(false); // Reset email sending status
        setIsOTPGenerated(false); // Reset OTP generation status
        setVerificationMessage(''); // Clear verification message
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center">Email OTP Verification</h1>
                            <form>
                                <div className={`form-group ${isEmailSent ? 'd-none' : ''}`}>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={`form-group ${isOTPGenerated ? '' : 'd-none'}`}>
                                    <label>OTP:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={otp}
                                        onChange={(e) => setOTP(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className={`btn btn-primary btn-block ${isEmailSent ? 'd-none' : ''}`}
                                    onClick={generateOTP}
                                >
                                    Generate OTP & Send
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-success btn-block ${isOTPGenerated ? '' : 'd-none'}`}
                                    onClick={verifyOTP}
                                >
                                    Verify OTP
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-info btn-block mt-3 ${isEmailSent ? '' : 'd-none'}`}
                                    onClick={resendOTP}
                                >
                                    Resend Email
                                </button>
                            </form>
                            {/* Display error message */}
                            {verificationMessage && (
                                <div className={`alert ${verificationMessage === 'OTP Verified' ? 'alert-success' : 'alert-danger'} text-center mt-3`} role="alert">
                                    {verificationMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmailOTPVerification;
