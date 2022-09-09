import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { FirebaseContextType } from '../models';
import { FirebaseContext } from './context/FirebaseContext';

interface IAuthRoute {
  children: ReactNode
};

const AuthRoute: any = ({ children }: IAuthRoute) => {

  const { user } = useContext(FirebaseContext) as FirebaseContextType;
  
  return !user ? children : <Navigate to='/' />;
}

export default AuthRoute;