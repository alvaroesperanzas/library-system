import React from 'react';

const InputText = (props) => {  
  const {
    field,
    size = 'ancho100',
    type = "text",
    ...otherProps
  } = props;
  const {form, errors, title} = props;
  const {touched} = form;
  const {value, name} = field;
  let valid = '';

  if (touched[name] && value && !errors[name]) {
    valid = 'valid';
  } else if (touched[name] && errors[name]) {
    valid = 'invalid';
  }

  return (
    <div className={`contenedor-el ${size} ${valid}`}>
      <label>{title}</label>
      <input
        type={type}
        {...field}
        {...otherProps}
      />
    </div>
  )
};

export default InputText;
