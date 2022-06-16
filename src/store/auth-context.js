import React, { useState } from "react";
import { useCallback, useEffect } from "react";

let logoutTimer;

// const IsAdmin = (token) => {
//   const currentToken = localStorage.getItem("token");
// };
// const jwt = retrieveStoredToken();

//authentication and authorization context
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isAdmin: false,
  login: (token) => {},
  logout: () => {},
});

function calculateExpirationTime(tokenTimer) {
  // function to calculate remaining  time of stored token
  const currentTime = new Date().getTime();
  const adjustedTimer = new Date(tokenTimer).getTime();
  const expirationTime = adjustedTimer - currentTime;
  return expirationTime;
}

function retrieveStoredToken() {
  // retrieve token from local storage
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expiration");

  const expirationTime = calculateExpirationTime(storedExpirationTime);
  //if token is less than 1min away from expiration remove it
  if (expirationTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return { isLoggedIn: false };
  }

  return {
    token: storedToken,
    expiration: expirationTime,
  };
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, tokenExpirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", tokenExpirationTime);

    const remainingLoginTime = calculateExpirationTime(tokenExpirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingLoginTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log("token expiration" + tokenData.expiration);
    }
    logoutTimer = setTimeout(logoutHandler, tokenData.expiration);
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    isAdmin: userLoggedIn && tokenData.isAdmin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
