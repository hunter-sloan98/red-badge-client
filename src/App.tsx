import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './components/auth/Auth'
import Navbar from '../src/components/navbar/Navbar'
import './App.css';
import CharacterDisplay from './components/characterCreation/CharacterDisplay';
import BlogDisplay from './components/blogPage/BlogDisplay';
import UserHome from './components/userPage/UserHome';


function App() {
  const [sessionToken, setSessionToken] = useState<any | null>('')

//*Setting our Token  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

//*Updating our Token
  const updateToken = (newToken: any) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(newToken)
  };

//*Clearing our Token for logout
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

//!GUARDIAN OF THE CYBER GATES: UNFINISHED
  // const gateKeeper = () => {
  //   return sessionToken === localStorage.getItem('token') ? (
  //     <>
  //     <Navbar/> /*logout={clearToken} token={sessionToken}*/
  //     </>
  //   ) : ( 
  //     <Auth updateToken={updateToken} />
  //   );
  // };

  return (
    <div className="App">
      {/* {gateKeeper()} */}
      <Router>
        <Navbar/>
      </Router>
    </div>
  );
}

export default App;
