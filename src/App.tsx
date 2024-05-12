import { useState, useEffect } from 'react'
import './App.css'
import Start from './components/pages/start/Start';
import Statistics from './components/pages/statistics/Statistics';
import Meny from './components/meny/Meny';
import Register from './components/pages/register/Register';
import Login from './components/pages/login/Login';
import Admin from './components/pages/admin/Admin';
import Users from './components/pages/admin/Users';

function App() {

  const [page, setPage] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState<boolean>(false);

  useEffect(() => {
    let pageUrl = page;

    if (!pageUrl) {
      const queryParameters = new URLSearchParams(window.location.search);
      const getUrl = queryParameters.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
      } else {
        pageUrl = isLoggedIn ? "start" : "login";
      }
    }

    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page, isLoggedIn]);

  return (
    <>
      <Meny
        setPage={setPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedInAdmin={isLoggedInAdmin}
        setIsLoggedInAdmin={setIsLoggedInAdmin} 
      />

      {page === "admin" && !isLoggedIn && <Admin setIsLoggedInAdmin={setIsLoggedInAdmin} setPage={setPage} />}

      {page === "login" && !isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} setPage={setPage} />}
      {page === "register" && !isLoggedIn && <Register />}

      {isLoggedInAdmin && page === "users" && <Users />}

      {isLoggedIn && {
        start: <Start />,
        statistics: <Statistics />
      }[page]}
    </>
  );
}

export default App
