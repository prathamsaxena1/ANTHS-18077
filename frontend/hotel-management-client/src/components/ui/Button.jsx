// src/components/ui/Button.jsx
import React from 'react';
import './Button.css';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  return (
<button>
  {children}
</button>
);
};

export default Button;