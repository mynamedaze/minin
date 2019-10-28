import React from 'react';
import './MenuToggle.scss';

const MenuToggle = props => {
  const clsName = ['menu-toggle'];

  if (props.isOpen) {
    clsName.push('opened');
  } else {
    clsName.push('closed');
  }

  return (
    <i
      className={clsName.join(' ')}
      onClick={props.onToggle}
    >

    </i>
  )
};

export default MenuToggle;