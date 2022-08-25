import { FC, useContext, ReactNode, createContext } from 'react';
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



const App: FC = () => {
  return (
    <FirebaseContextProvider >
      <div className="App">
        <Header />
        <div className="main">
          <Routes>
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
          </Routes>
          
        </div>
        <Footer />
      </div>
    </FirebaseContextProvider>
  );
}

export default App;
