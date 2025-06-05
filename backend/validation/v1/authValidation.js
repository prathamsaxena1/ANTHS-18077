import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';

// Helper validation functions
const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 50) return 'Name cannot exceed 50 characters';
  return null;
};

const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please provide a valid email address';
  return null;
};

const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  if (!passwordRegex.test(password)) {
    return 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
  }
  return null;
};

const validatePasswordConfirm = (password, passwordConfirm) => {
  if (!passwordConfirm) return 'Please confirm your password';
  if (password !== passwordConfirm) return 'Passwords do not match';
  return null;
};

// Registration validation middleware
export const validateRegister = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, phoneNumber, role } = req.body;
  const errors = [];

  // Validate each field
  const nameError = validateName(name);
  if (nameError) errors.push(nameError);

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  const passwordConfirmError = validatePasswordConfirm(password, passwordConfirm);
  if (passwordConfirmError) errors.push(passwordConfirmError);

  // Validate role if provided
  if (role && role !== 'user') {
    errors.push('Invalid role');
  }

  if (errors.length > 0) {
    return next(new AppError(errors.join('; '), 400));
  }

  // Sanitize data
  req.body = {
    name: name.trim(),
    email: email.trim(),
    password,
    phoneNumber: phoneNumber || undefined,
    role: role || 'user'
  };

  next();
});

// Login validation middleware
export const validateLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  if (!password) errors.push('Password is required');

  if (errors.length > 0) {
    return next(new AppError(errors.join('; '), 400));
  }

  // Sanitize data
  req.body = {
    email: email.trim(),
    password
  };

  next();
});