import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import CSS for react-phone-number-input

function OTPForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const sendOTP = () => {
        if (!phoneNumber) {
            setErrorMessage('Phone number cannot be empty.');
            return;
        }

        fetch('http://localhost:3001/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to: phoneNumber }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setOtpSent(true);
                    setErrorMessage('');
                } else {
                    setOtpSent(false);
                    setErrorMessage('Failed to send OTP. Please check your phone number.');
                }
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to send OTP. Please try again later.');
            });
    };

    const verifyOTP = () => {
        if (!otp) {
            setErrorMessage('OTP cannot be empty.');
            return;
        }

        fetch('http://localhost:3001/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, otp }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setVerificationSuccess(true);
                    setErrorMessage('');
                } else {
                    setVerificationSuccess(false);
                    setErrorMessage('Invalid OTP. Please try again.');
                }
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to verify OTP. Please try again later.');
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">OTP Verification</h1>
            {!otpSent && !verificationSuccess && (
                <div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(value) => setPhoneNumber(value)}
                            className="form-control"
                        />
                    </div>
                    <button className="btn btn-primary" onClick={sendOTP}>
                        Send OTP
                    </button>
                    {errorMessage && (
                        <div className="alert alert-danger mt-2">{errorMessage}</div>
                    )}
                </div>
            )}
            {otpSent && !verificationSuccess && (
                <div>
                    <div className="form-group">
                        <label>Enter OTP</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success" onClick={verifyOTP}>
                        Verify OTP
                    </button>
                    {errorMessage && (
                        <div className="alert alert-danger mt-2">{errorMessage}</div>
                    )}
                </div>
            )}
            {verificationSuccess && (
                <div className="alert alert-success mt-2">
                    OTP Verified successfully!
                </div>
            )}
        </div>
    );
}

export default OTPForm;
