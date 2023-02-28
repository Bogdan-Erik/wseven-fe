
import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { reset, setAuthToken, setCredentials } from "../redux/authSlice";
import store from "../redux/store";
const ProtectedRoute = (props: any) => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const parseJwt = (token: string) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  
  const checkUserToken = () => {
    const accessToken = store.getState().auth.accessToken

    if (!accessToken) {
      store.dispatch(reset());

      setIsLoggedIn(false);
      return navigate('/login');
    }
   // const auth = localStorage.getItem('persist:root');
    const jwt = parseJwt(accessToken);
    const expirationDate = new Date(jwt.exp * 1000);
    const currentTimestamp = Date.now();

    const diff = expirationDate.getTime() - currentTimestamp;
    if ((!accessToken || accessToken === 'undefined') || diff < 0) {
      store.dispatch(reset());

      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
  }
  
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      {
        isLoggedIn ? props.children : null
      }
    </React.Fragment>
  );
}
export default ProtectedRoute;