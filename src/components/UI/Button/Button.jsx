import React from 'react';
import './Button.scss';

const Button = props => {
  const clsName = [
    'button',
    props.type
  ];
  return (
    <button
      onClick={props.onClick}
      className={clsName.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
};

export default Button;