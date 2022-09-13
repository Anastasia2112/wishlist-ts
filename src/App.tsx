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
import './default.scss';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react';
import store from './store/Store';
import { FirebaseContext } from './components/context/FirebaseContext';
import { FirebaseContextType } from './models';


const App: FC = observer(() => {

const { user } = useContext(FirebaseContext) as FirebaseContextType;


const userLS = JSON.parse(localStorage.getItem('user')!);


  useEffect(() => {
    if (localStorage.getItem("auth") && localStorage.getItem('user')) {
      store.setIsAuth(true);
      store.setUser(userLS);
    }
  }, [])

  const isAuth = store.isAuth;
  const sUser = store.user;

  console.log("aAuth: ", isAuth);
  console.log("sUser: ", sUser);

  return (
      <div className="App">
          <Header />
          <div className="main">
            <AppRouter />
          </div>
          <Footer />
      </div>
  );
});

export default App;
