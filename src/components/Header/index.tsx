
import { FC, useState } from 'react';
import { Button, Space } from 'antd';
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import TestPage from '../../pages/TestPage';

import './styles.scss'


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
        <Link to="/" className={'header-logo'}>Your Wishlist</Link>
        <Space>
          {/* <Link to="/test">TestPage</Link> */}
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

