import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to='/welcome' className="nav-link">Welcome</Link>
      <Link to='/profile' className="nav-link">Profile</Link>
      <Link to='/goals' className="nav-link">Goals</Link>
      <Link to='/journal' className="nav-link">Journal</Link>
      <Link to='/resources' className="nav-link">Resources</Link>
      <Link to='/contact' className="nav-link">Contact</Link>
    </nav>
  );
};

export default Navbar;