import React from 'react';
import './Drawer.scss';
import Overlay from "../../UI/Overlay/Overlay";

const links = [
  1, 2, 3
];

class Drawer extends React.Component {

  renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li
          key={index}
        >
          <span>Link {link}</span>
        </li>
      )
    })
  };

  render() {
    const clsName = ['drawer'];

    if (!this.props.isOpen) {
      clsName.push('close');
    }

    return (
        <React.Fragment>
          <nav className={clsName.join(' ')}>
            <ul>
              {this.renderLinks()}
            </ul>
          </nav>
          { this.props.isOpen ? <Overlay onClick={this.props.onClose}/> : null}
        </React.Fragment>

    );
  }
}

export default Drawer;