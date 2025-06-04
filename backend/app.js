// In server.js or app.js
const config = require('./config/config');

// Connect to the database
mongoose.connect(config.mongoUri);

// Set up JWT authentication
app.use(jwt({ secret: config.jwtSecret, algorithms: ['HS256'] }));

// Configure email provider
const transporter = nodemailer.createTransport(config.emailConfig);

// Set API port
app.listen(config.port, () => {
  console.log(`Server running in ${config.env} mode on port ${config.port}`);
});
