import React,{useCallback, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Users from './pages/Users';
import NewDetails from './Details/NewDetails';
import MainNavigation from './shared/Navigation/MainNavigation';
import UserDetails from './Details/UserDetails';
import EditDetails from './Details/EditDetails';
import Auth from './pages/Auth';
import { AuthContext } from './context/auth-context';

const App = () => {

  const[isLoggedIn,setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  
  return (

    
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
    <Router>
    <MainNavigation />
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/details/new" element={<NewDetails />} />
      <Route path="/:userId/details" element={<UserDetails />} />
      <Route path="/details/:detailsId" element={<EditDetails />} />
      <Route path="/auth" element={<Auth />}/>
      <Route path="*" element={<Navigate to="/" replace />} /> {/* catch-all redirect */}
    </Routes>
  </Router>
    </AuthContext.Provider>
   
  );
};

export default App;
