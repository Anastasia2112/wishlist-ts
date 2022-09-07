import { FC, useContext, ReactNode, createContext, useState, useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Footer from './components/Footer';
import TestPage from './pages/TestPage';
import './default.scss';
import logo from './logo.svg';
import { FirebaseContext } from '../src/components/context/FirebaseContext';
import CheckContextProvider from '../src/components/context/CheckContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseContextType } from './models';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import Archive from './pages/Archive';

const App: FC = () => {

  // const auth = getAuth();
  // const { auth } = useContext(FirebaseContext) as FirebaseContextType;

  // const [user, loading, error] = useAuthState(auth);
  
  return (

      <div className="App">
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <CheckContextProvider >
                  <Homepage />
                </CheckContextProvider> 
              </ProtectedRoute>} 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/archive" element={
              <ProtectedRoute>
                <Archive />
              </ProtectedRoute>} 
            />
            <Route path="/test" element={<TestPage />} />
            <Route
                path="*"
                element={<Navigate to="/" replace/>}
            />
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
