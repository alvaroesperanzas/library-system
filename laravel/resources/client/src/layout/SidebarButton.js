import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SidebarButton extends Component {

  toggleSubmenu(e) {
    var menuState = false;
    var height = 0;
    if(!this.state.menuState){
      if(this.refs.listado){
        menuState = !this.state.menuState;
        height = this.refs.listado.children.length * 61;
      }
    }

    this.setState({
      menuState: menuState,
      styles: {
        height: height
      }
    });
  }

  constructor(props){
    super(props);

    this.state = {
      menuState: false,
      styles: {
        height: 0
      },
    };
    this.toggleSubmenu = this.toggleSubmenu.bind(this);
  }

  render() {
    const {button} = this.props;
    return(
      <li className={(button.quitter)? 'quitter' : null}>
        {
          button.action !== '' ?
          (
            <Link to={button.action} className="submenu" onClick={this.toggleSubmenu}>
              <div><span className={button.icon}></span></div>
              <div>{button.title}</div>
              {(button.notification)? <div className="notificacion"><span className="circulo-azul"></span></div> : null}
            </Link>
          ) :
          (
            <a className="submenu" onClick={this.toggleSubmenu}>
              <div><span className={button.icon}></span></div>
              <div>{button.title}</div>
              {(button.notification)? <div className="notificacion"><span className="circulo-azul"></span></div> : null}
            </a>
          )
        }

        {(button.submenu && button.submenu.length > 0)?
          <ul ref="listado" className="linear" style={ this.state.styles }>
            { button.submenu.map((opcion, i) => {
              return (<li key={i}>
                <Link to={opcion.action}>
                  <div></div>
                  <div>{opcion.title}</div>
                  {(opcion.notification)? <div className="notificacion"><span className="circulo-azul"></span></div> : null}
                </Link>
              </li>);
            }) }
          </ul>
         :null
       }


      </li>
    );
  }
}

export default SidebarButton;
