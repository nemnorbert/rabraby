const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.status(503).json({
        success: false,
        status: 503,
        message: 'ADANOR API is currently undergoing maintenance. Please try again later.'
    });
});

module.exports = app;