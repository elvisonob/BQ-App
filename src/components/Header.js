import React from 'react';
import logo from './../British-logo.png';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="British Logo" height="100px" width="100px" />
      <h1>Basic British Quiz</h1>
    </header>
  );
}
