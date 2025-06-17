// src/components/ui/Input.jsx
import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  id,
  name,
  type = 'text',
  label,
  error,
  placeholder,
  helpText,
  fullWidth = false,
  className = '',
  onChange,
  onBlur,
  value,
  required = false,
  disabled = false,
  ...props
}, ref) => {
  return (
<div>
  {label && (
<label>
      {label} {required &&
<span>
</span>
}

</label>
  )}
  
  <input
    ref={ref}
    id={id || name}
    name={name}
    type={type}
    className={`input ${error ? 'input-error' : ''}`}
    placeholder={placeholder}
    onChange={onChange}
    onBlur={onBlur}
    value={value}
    required={required}
    disabled={disabled}
    {...props}
  />
  
  {helpText && !error && (
<p>
{helpText}

</p>
  )}
  
  {error && (
<p>
{error}

</p>
  )}
</div>
);
});

export default Input;