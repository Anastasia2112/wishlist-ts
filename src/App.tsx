import { FC } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Footer from './components/Footer';
import CheckContextProvider from '../src/components/context/CheckContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';
import './default.scss';

const App: FC = () => {
  
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
            <Route path="/login" element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } />
            <Route path="/registration" element={
              <AuthRoute>
                <Registration />
              </AuthRoute>
            } />
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
