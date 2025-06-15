import cors from "cors";
import express from "express";
import userRoutes from "./routes/v1/userRoutes.js";
import cloudinaryConfig from "./config/cloudinary.js";
import listingRoutes from "./routes/v1/hotelRoutes.js";

// Initialize the Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Use JSON middleware for parsing application/json
app.use(express.json());

// Use URL-encoded middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use("/api/v1/user", userRoutes);

// Configure Cloudinary
cloudinaryConfig();

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

// Export the app
export default app;
