import React from 'react';
import './Drawer.scss';
import Overlay from "../../UI/Overlay/Overlay";
import {NavLink} from 'react-router-dom';

const links = [
  {to: '/', label: 'Список', exact: true},
  {to: '/auth', label: 'Авторизация', exact: false},
  {to: '/quiz-creator', label: 'Создать тест', exact: false}
];

class Drawer extends React.Component {

  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li
          key={index}
        >
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={'active'}
            onClick={this.clickHandler}
          >{link.label}</NavLink>
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