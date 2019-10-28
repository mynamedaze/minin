import React from 'react';
import './Overlay.scss';

const Overlay = props => (
  <div className='overlay'
    onClick={props.onClick}
  />
);

export default Overlay;