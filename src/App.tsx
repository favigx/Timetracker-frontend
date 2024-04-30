import { useState, useEffect } from 'react'
import './App.css'
import Start from './components/pages/start/Start';
import Statistics from './components/pages/statistics/Statistics';
import Meny from './components/meny/Meny';

function App() {

  const [page, setPage] = useState<string>("");

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
     <Meny setPage={setPage} />

     {
      {
        "start": <Start />,
        "statistics": <Statistics />
      } [page]
     }
    </>
  )
}

export default App
