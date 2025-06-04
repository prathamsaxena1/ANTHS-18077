// utils/catchAsync.js

/**
 * Wrapper function to catch async errors
 * @param {Function} fn - Async function to wrap
 */
const catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };
  
  module.exports = catchAsync;