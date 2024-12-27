import React from 'react';
import { FaHome, FaTablet, FaSignOutAlt,FaAlignCenter,FaQrcode } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  

 
  
  

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1>Portal</h1>
      </div>
      <ul className="sidebar-menu">
   
  <NavLink to={'/dashboard'}>{user?.role === 'admin' &&  <li className={`sidebar-menu-item `}>
        <FaHome />
        <span>Dashboard</span>
      </li>}</NavLink>

  <NavLink to={'/register'}>{user?.role === 'admin' &&  <li className={`sidebar-menu-item `}>
        <FaHome />
        <span>Register Client</span>
      </li>}</NavLink>
  
  
    <NavLink to={'/chats'}>{user?.role === 'admin' && <li className={`sidebar-menu-item `}>
        <FaAlignCenter />
        <span>Chats</span>
      </li>}</NavLink>

   <NavLink to={'client-details'}>{user?.role === 'user' &&  <li className={`sidebar-menu-item `}>
        <FaQrcode />
        <span>Scan QR</span>
      </li>}</NavLink>

     <NavLink to={'devices'}> {user?.role === 'admin' && <li  className={`sidebar-menu-item `}>
        <FaTablet />
        <span>Devices</span>
      </li>}</NavLink>

 
          
        

      </ul>
      <div className="sidebar-footer">
        <button className="logout-button" onClick={() => alert('Logged out')}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;

