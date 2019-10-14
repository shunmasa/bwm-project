import React from 'react';
export const BwmTextArea = ({
  input,
  label,
  type,
  rows,
  className,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div className="input-group">
      <textArea {...input} placeholder={label}rows={rows} type={type} className={className}></textArea>
      </div>
      {touched && (error && <div className="alert alert-danger">{error}</div>)}
   
  </div>
);
