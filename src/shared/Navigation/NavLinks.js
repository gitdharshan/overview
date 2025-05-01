import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLink.css';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/details">MY DETAILS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/details/new">ADD DETAILS</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTH</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
