import React from 'react';
import './Input.scss';

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched;
}

const Input = props => {
  const inputType = props.type || 'text';
  const clsName = ['input'];
  const htmlFor = props.id || `${inputType}-${Math.random()}`;

  isInvalid(props) && clsName.push('invalid');

  return (
    <div className={clsName.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid(props) && <span>{props.errorMessage || 'Введите верное значение'}</span>
      }
    </div>
  )
};

export default Input;