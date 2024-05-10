import { useState, useEffect } from 'react'
import './App.css'
import Start from './components/pages/start/Start';
import Statistics from './components/pages/statistics/Statistics';
import Meny from './components/meny/Meny';
import Register from './components/pages/register/Register';
import Login from './components/pages/login/Login';

function App() {

  const [page, setPage] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() =>{

    let pageUrl = page

    if(!pageUrl){

      const queryParameters = new URLSearchParams(window.location.search)
      const getUrl = queryParameters.get("page");
  
      if(getUrl){
        pageUrl = getUrl;
        setPage(getUrl)
      } else{
        pageUrl = "start"
      }
    }

    window.history.pushState(
      null,
      "",
      "?page=" + pageUrl
    )
  }, [page])


  return (
    <>
     <Meny setPage={setPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

     {
      {
        "start": <Start />,
        "statistics": <Statistics />,
        "register": <Register />,
        "login": <Login setIsLoggedIn={setIsLoggedIn} />
      } [page]
     }
    </>
  )
}

export default App
