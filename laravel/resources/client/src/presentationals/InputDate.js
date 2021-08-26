import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputDate = (props) => {  
  const {
    field,
    size = 'ancho100',
    type = "text",
    onSelect,
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
      <DatePicker
        dateFormat="d MMMM, yyyy"
        className="custom-datepicker"
        type="button"
        onChange={onSelect}
        selected={value}
        {...otherProps}          
        placeholderText="Select a date"
      />
      {/* <input
        type={type}
        {...field}
        {...otherProps}
      /> */}
    </div>
  )
};

export default InputDate;
