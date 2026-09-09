const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files if we want to host them together
app.use(express.static(path.join(__dirname, 'frontend')));

// Basic API Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Antenity API is running' });
});

// Placeholder for routes (e.g. contact form submissions)
app.post('/api/contact', (req, res) => {
    const { name, email, company, service, message } = req.body;
    // In a real application, you would save this to a database or send an email via Nodemailer
    console.log('Received contact request:', { name, email, company, service, message });
    
    res.status(200).json({ status: 'success', message: 'Message received successfully. We will contact you soon.' });
});

// Catch-all route to serve index.html for unknown frontend routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
