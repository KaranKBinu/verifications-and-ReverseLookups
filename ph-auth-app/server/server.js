
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

const accountSid = 'AC6c2a4b77b5b856bc5dfccf14a11cd424';
const authToken = '1fb627959e06e11fdb659a7a67bc3aec';

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
            from: '+13347817028',
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
