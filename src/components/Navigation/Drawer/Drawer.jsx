import React from 'react';
import './Drawer.scss';
import Overlay from "../../UI/Overlay/Overlay";
import {NavLink} from 'react-router-dom';

class Drawer extends React.Component {

  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks = (links) => {
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

    const links = [
      {to: '/', label: 'Список', exact: true}
    ];

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
      links.push({to: '/logout', label: 'Выйти', exact: false});
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false},);
    }

    return (
        <React.Fragment>
          <nav className={clsName.join(' ')}>
            <ul>
              {this.renderLinks(links)}
            </ul>
          </nav>
          { this.props.isOpen ? <Overlay onClick={this.props.onClose}/> : null}
        </React.Fragment>

    );
  }
}

export default Drawer;