// src/components/ui/Select.jsx
import React, { forwardRef } from 'react';
import './Select.css';

const Select = forwardRef(({
  id,
  name,
  label,
  options = [],
  error,
  helpText,
  fullWidth = false,
  className = '',
  onChange,
  onBlur,
  value,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
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
  
  <div className="select-wrapper">
<select>
      {placeholder &&
<option>
{placeholder}

</option>
}
{options.map(option => (

<option>
          {option.label}
</option>
      ))}
</select>
</div>
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

export default Select;