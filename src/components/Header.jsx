import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Chinmay</div>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
