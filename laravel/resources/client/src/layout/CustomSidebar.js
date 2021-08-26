import React from 'react'
import SidebarButton from './SidebarButton';
import moment from 'moment';

const buttons = [
  {
    title: 'Dashboard',
    action: '/',
  },
  {
    title: 'Books',
    action: '/books',
  },
  {
    title: 'Categories',
    action: '/categories',
  },
  {
    title: 'Users',
    action: '/users',
  }
];

const CustomSidebar = (
  <aside id="sidebar-menu" className="sidebar">
    <nav id="sidebar-wrapper" className="sidebar-wrapper">
    <ul>
      {buttons.map((button, i) => {
        return <SidebarButton key={i} button={button} />;
      })}
      <li className="list-title">&copy;{moment().format('Y')} Library System</li>
    </ul>
    </nav>
  </aside>
  );

  export default CustomSidebar;