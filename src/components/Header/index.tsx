
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FirebaseContext } from '../context/FirebaseContext';
import './styles.scss'
import { FirebaseContextType } from '../../models';

const Header: FC = () => {

  const auth = getAuth();

  const [isUser, setIsUser] = useState<any>(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  });
  
  const signOutHandler = () => {
    signOut(auth);
  }

  return (
    <header className='header'>
      <div className='wrap'>
        <span className={'header-logo'}>Your Wishlist</span>
        <Space>
          {isUser && <Link to="/login"><Button onClick={signOutHandler}>Выйти</Button></Link>}
        </Space>
      </div>
    </header>
  );
};

export default Header;
function useAuthState(auth: any): [any] {
  throw new Error('Function not implemented.');
}

