import { FC, useContext, ReactNode, createContext, useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Footer from './components/Footer';
import TestPage from '../src/pages/TestPage';
import './default.scss';
import logo from './logo.svg';
import AuthRoute from './components/AuthRoute';
import FirebaseContextProvider from '../src/components/context/FirebaseContext';
import CheckContextProvider from '../src/components/context/CheckContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



const App: FC = () => {

  const auth = getAuth();

  const [isUser, setIsUser] = useState<any>(true)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  });

  return (

      <div className="App">
        <Header />
        <div className="main">
        {isUser ?
          <Routes>
            <Route path="/" element={
              <CheckContextProvider >
                <Homepage />
              </CheckContextProvider> } 
            />
            {/* <Route path="/test" element={<TestPage />} /> */}
            <Route
                path="*"
                element={<Navigate to="/" replace/>}
            />
          </Routes>
        :
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="*"
                element={<Navigate to="/login" replace/>}
            />
          </Routes>
        }
          {/* <Routes>
            <Route 
              path="/" 
              element={
                <AuthRoute>
                  <CheckContextProvider >
                    <Homepage />
                  </CheckContextProvider>
                </AuthRoute>} 
            />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="*"
                element={<Navigate to="/" replace/>}
            />
          </Routes> */}
          
        </div>
        <Footer />
      </div>
  );
}

export default App;
