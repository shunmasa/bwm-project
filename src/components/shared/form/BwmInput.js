import React from 'react';
export const BwmInput = ({
  input,
  label,
  type,
  symbol,
  className,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label>{label}</label>

    {symbol && 
    <div className='input-group-prepend'>
      <div className='input-group-text'>{symbol}</div>
      </div>
      }
    <div className="input-group">
      <input {...input} placeholder={label} type={type} className={className}/>
      </div>
      {touched && (error && <div className="alert alert-danger">{error}</div>)}
   
  </div>
);