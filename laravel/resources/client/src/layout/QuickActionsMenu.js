import React from 'react';
import {Link} from 'react-router-dom';

const QuickActionsMenu = ({toggle}) => (
  <nav className="menu-header" data-menuheader="accionrapida">
    <ul>
        <li>
          <Link onClick={toggle} to="/books/create">
            <div><span className="icon-CrearComprobante"></span></div>
            <div>Add books</div>
          </Link>
        </li>
        <li>
          <Link onClick={toggle} to="/categories/create">
            <div><span className="icon-CrearComprobante"></span></div>
            <div>Add a categories</div>
          </Link>
        </li>
        <li>
          <Link onClick={toggle} to="/">
            <div><span className="icon-CrearComprobante"></span></div>
            <div>Dashboard</div>
          </Link>
        </li>
      </ul>
      <div className="background" onClick={toggle}></div>
  </nav>
)

export default QuickActionsMenu;