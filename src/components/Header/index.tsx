
import { FC, useContext } from 'react';
import { Button, Space } from 'antd';
import {Link} from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import { FirebaseContext } from '../context/FirebaseContext';
import './styles.scss'

const Header: FC = () => {
  // const auth = getAuth();
  const auth = useContext(FirebaseContext);

  return (
    <header className='header'>
      <div className='wrap'>
        <Link to="/" className={'header-logo'}>Your Wishlist</Link>
        {/* <Button><Link to="/registration">Войти</Link></Button> */}
        <Space>
          <Button><Link to="/login">Войти</Link></Button>
          <Button onClick={() => signOut(auth)}>Выйти</Button>
        </Space>
      </div>
    </header>
  );
};

export default Header;
