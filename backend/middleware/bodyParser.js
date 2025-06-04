// middleware/bodyParser.js

const express = require('express');

const configureBodyParsers = (app) => {
  // Parse JSON bodies
  app.use(express.json({
    limit: '10kb', // Limit size
    strict: true, // Only accept arrays and objects
    verify: (req, res, buf) => {
      // Optional verification function
      // Store raw body for webhook verification if needed
      if (req.url.startsWith('/api/webhooks')) {
        req.rawBody = buf.toString();
      }
    }
  }));

  // Parse URL-encoded bodies (HTML forms)
  app.use(express.urlencoded({
    extended: true, // Use qs library for parsing
    limit: '10kb' // Limit size
  }));
};

module.exports = configureBodyParsers;