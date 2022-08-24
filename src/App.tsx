import { FC, useContext, ReactNode, createContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Footer from './components/Footer';
import TestPage from '../src/pages/TestPage';
import { initializeApp } from 'firebase/app';
import { config } from './firebase/config';
import './default.scss';
import logo from './logo.svg';
import AuthRoute from './components/AuthRoute';
import { getAuth } from 'firebase/auth';
import FirebaseContextProvider from '../src/components/context/FirebaseContext';
import FirebaseContext from '../src/components/context/FirebaseContext'

// type FirebaseContextProviderProps = {
//   // firebase: any;
//   children: ReactNode
//   // firestore: any;
// }

// initializeApp(config.firebaseConfig);
// const auth = getAuth();

// const FirebaseContext = createContext(auth);

// export const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {
//   return <FirebaseContext.Provider value={auth}>{children}</FirebaseContext.Provider>
// }



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
                  <Homepage />
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
