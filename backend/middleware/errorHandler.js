// middleware/errorHandler.js - Modify to provide more details in development

export const errorHandler = (err, req, res, next) => {
  console.error('ERROR 💥:', err);
  
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Different error handling for development vs production
  if (process.env.NODE_ENV === 'development') {
    // In development, send detailed error information
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // In production, don't leak error details
    // But still provide specific message for 403 errors
    if (err.statusCode === 403) {
      res.status(403).json({
        status: 'forbidden',
        message: 'Access to this resource is forbidden. ' + err.message
      });
    } else {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.isOperational ? err.message : 'Something went wrong!'
      });
    }
  }
};