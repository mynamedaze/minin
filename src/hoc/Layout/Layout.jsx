import React from 'react';
import './Layout.scss';
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends React.Component {

  state = {
    menu: false
  };

  toggleMenuHandler = () => {
    this.setState((state) => ({menu: !this.state.menu}))
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false
    });
  };

  render() {
    return (
      <div>

        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
        />

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main className="layout">
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout;