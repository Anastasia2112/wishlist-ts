import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Footer from './components/Footer';
import CheckContextProvider from '../src/components/context/CheckContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';
import { AuthContext } from './components/context/AuthContext';
import Loader from './components/Loader';
import { AuthContextType } from './models';
import './default.scss';


interface ProtectRouteProps {
  ({ auth, redirectPath } : { auth: boolean| undefined, redirectPath: string }): JSX.Element,
}

const App: FC = () => {

  const { isAuth, updateAuth, isLoading, updateLoading } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      updateAuth(true);
    }
    updateLoading(false);
  }, [])

  console.log("isAuth: ", isAuth);

  const ProtectRoute: ProtectRouteProps = ({ auth, redirectPath = '/' }) => {
    if (auth) {
      return <Outlet />;
    }

    return <Navigate to={redirectPath} replace />;
  }

  if (isLoading) {
    return <Loader />
  }

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
            {/* <Routes>
              <Route element={<ProtectRoute auth={isAuth} redirectPath='/' />}>
                <Route path="/" element={
                  <CheckContextProvider >
                    <Homepage />
                  </CheckContextProvider> 
                } />
              </Route>
              <Route element={<ProtectRoute auth={!isAuth} redirectPath='/login' />}>

                <Route path="/login" element={
                    <Login />
                } />
                <Route path="/registration" element={
                    <Registration />
                } />
              </Route>
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
