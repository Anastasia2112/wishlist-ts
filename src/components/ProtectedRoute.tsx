import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { FirebaseContextType } from '../models';
import { FirebaseContext } from './context/FirebaseContext';

interface IProtectedRoute {
  children: ReactNode
};

const ProtectedRoute: any = ({ children }: IProtectedRoute) => {

  const { user } = useContext(FirebaseContext) as FirebaseContextType;
  
  return user ? children : <Navigate to='/login' />;
}

export default ProtectedRoute;