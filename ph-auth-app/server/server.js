
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

const accountSid = 'ADD_YOUR_SID_HERE';
const authToken = 'ADD_YOUR_AUTH_TOKEN_HERE';

const client = new twilio(accountSid, authToken);

// Generate a random OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

let otpMap = {};

app.post('/send-otp', (req, res) => {
    const { to } = req.body;
    const otp = generateOTP();
    otpMap[to] = otp;

    client.messages
        .create({
            body: `Your OTP is: ${otp}`,
            from: 'ADD_YOUR_TWILIO_NUMBER_HERE',
            to,
        })
        .then(() => {
            res.json({ success: true });
        })
        .catch((error) => {
            res.json({ success: false, error: error.message });
        });
});

app.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (otpMap[phoneNumber] === otp) {
        res.json({ success: true });
    } else {
        res.json({ success: false, error: 'Invalid OTP' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
