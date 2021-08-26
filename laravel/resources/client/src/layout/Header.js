import React, { Component } from 'react';

// Components
import UserMenu from './UserMenu';
import QuickActionsMenu from './QuickActionsMenu';
import UserProvider from '../providers/UserProvider';

class Header extends Component {
  static contextType = UserProvider;

  constructor(props){
    super(props);

    this.state = {
      isQuickActionsOpen: false,
      isProfileMenuOpen: false
    };

    this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
    this.toggleQuickAction = this.toggleQuickAction.bind(this);
  }

  toggleProfileMenu(){
    const {isProfileMenuOpen} = this.state;
    this.setState({
      isProfileMenuOpen: !isProfileMenuOpen,
      isQuickActionsOpen: false
    });
  }

  toggleQuickAction(){
    const {isQuickActionsOpen} = this.state;
    this.setState({
      isQuickActionsOpen: !isQuickActionsOpen,
      isProfileMenuOpen: false,
    });
  }

  render() {
    const {user} = this.context;
    const {
      isQuickActionsOpen,
      isProfileMenuOpen,
    } = this.state;
    return (
    <header className="template-header">

    	<div className="left">
    		<a id="sidebar-menu-trigger" className="menu-trigger" onClick={this.props.toggleSidebar}>
    			<span className="icon-Menu"></span>
    		</a>
    	</div>

    	<div className="center">
    		<div>
    			<div>
            Library System
          </div>
    		</div>
    	</div>

    	<div className="right">
    		<a data-accion="accionrapida" onClick={this.toggleQuickAction}>
    			<span className="icon-AccionRapida"></span>
    		</a>
    		<a data-accion="usuario" className="accion-usuario" onClick={this.toggleProfileMenu}>
    			Hi,
    			<div className="wrap usuario-nombre">{` ${user.name}`}</div>
    			<span className="icon-DropdownMenu"></span>
    		</a>
    		<a data-accion="usuario" className="accion-usuario-responsivo">
    			<span className="icon-MiContador"></span>
    		</a>
    	</div>
      {(isQuickActionsOpen)? <QuickActionsMenu toggle={this.toggleQuickAction} /> : null}
      {(isProfileMenuOpen)? <UserMenu toggle={this.toggleProfileMenu}/> : null}
    </header>
    );
  }
}

export default Header;
