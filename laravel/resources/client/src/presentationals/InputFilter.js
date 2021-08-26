import React from 'react';

const InputFilter = ({
  name,
  value,
  onChange,
  placeholder = "",
  size = 'ancho50',
  type = "text"
}) => (
  <div className={`contenedor-el ${size}`}>
    <label>{name}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default InputFilter;
