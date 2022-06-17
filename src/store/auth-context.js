import React, { useState } from "react";
import { useCallback, useEffect } from "react";

let logoutTimer;

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

function retrieveStoredUserInfo() {
  // retrieve token from local storage
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expiration");
  const storedUsername = localStorage.getItem("username");

  const expirationTime = calculateExpirationTime(storedExpirationTime);
  //if token is less than 1min away from expiration remove it
  if (expirationTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("username");

    return { isLoggedIn: false };
  }

  return {
    token: storedToken,
    username: storedUsername,
    expiration: expirationTime,
  };
}

export const AuthContextProvider = (props) => {
  let initialToken;
  let initialUsername; // for admin

  const tokenData = retrieveStoredUserInfo();
  const [isAdmin, setIsAdmin] = useState(false);

  if (tokenData) {
    initialToken = tokenData.token;
    initialUsername = tokenData.username;
  }

  const [token, setToken] = useState(initialToken);
  useEffect(() => {
    if (initialUsername === "AdminZ") {
      setIsAdmin(true);
    }
  }, [initialUsername]);

  const userLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, tokenExpirationTime, storedUsername) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", tokenExpirationTime);
    localStorage.setItem("username", storedUsername);

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
    isAdmin: isAdmin,
    isLoggedIn: userLoggedIn,
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
