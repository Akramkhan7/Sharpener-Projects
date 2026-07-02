 import React from "react";

function Header() {
  return (
    <header>
      <nav>
        <h1>Logo</h1>

        <ul>
          <li>Menu</li>
          <li>About</li>
          <li>Career</li>
        </ul>

        <div className="nav-buttons">
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;