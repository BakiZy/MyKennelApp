import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Navigation = () => {
  const authContext = useContext(AuthContext);

  const isLogged = authContext.isLoggedIn;
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        &#128041; Poodle kennel Von Apalusso &#128041;
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isLogged && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLogged && (
            <li>
              <Link to="/" onClick={authContext.logout}>
                Logout
              </Link>
            </li>
          )}
          <li>
            <Link to="/poodles">Poodles</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
