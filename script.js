// Import required libraries
const express = require('express'); // Import the Express framework
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const mailgun = require('mailgun-js'); // Library for sending emails

// Create an instance of the Express app
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false })); // Use body-parser middleware for parsing URL-encoded request bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

// Home page route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Send the 'index.html' file as the response
});

// Subscription endpoint
app.post('/subscribe', (req, res) => {
    // Extract the email from the request body
    const { email } = req.body;

    // Mailgun API credentials
    const api_key = 'MY_API_KEY';
    const domain = '_DOMAIN_';

    // Create a Mailgun instance
    const mg = mailgun({ apiKey: api_key, domain: domain });

    // Email data to be sent
    const emailData = {
        from: 'sujal4845.be22@chitkara.edu.in',
        to: email,
        subject: 'Welcome OnBoard!!',
        html: `<p>Hi ${email},</p>
               <p>Thank you for subscribing to our newsletter!</p>
               <p>We hope you enjoy our service.</p>
               <p>Have a good day!</p>`
    };

    // Send the email using Mailgun API
    mg.messages().send(emailData, (error, body) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email'); // Respond with an error if sending fails
        } else {
            console.log('Email sent:', body);
            res.send('Subscription successful! Check your email.'); // Respond with success message
        }
    });
});

// Start the server
const port = process.env.PORT || 3000; // Use the specified environment port or default to 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log server start
});
