import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class UserMenu extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  async onClickLogout(e) {
    e.preventDefault();
   
  }

  render(){
    return(
      <nav className="menu-header" data-menuheader="usuario">
        <ul>
          <li>
            <Link to="/profile">
              <div><span className="icon-CerrarSesion"></span></div>
              <div>Perfil</div>
            </Link>
          </li>
          <li>
            <a onClick={this.onClickLogout}>
              <div><span className="icon-CerrarSesion"></span></div>
              <div>Cerrar sesión</div>
            </a>
          </li>
        </ul>
        <div className="background" onClick={this.props.toggle}></div>
      </nav>
    );
  }
}

export default withRouter(UserMenu);