import React from 'react';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { Navbar } from './components/Navbar';
import 'materialize-css';
import { Loader } from './components/Loader';


function App() {
  const { token, userId, login, logout, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated);

  if(!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
      {isAuthenticated && <Navbar />}
      <div className='container' >
        {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
