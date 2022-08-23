import { Button, Space } from 'antd';
import { FC } from 'react';
import {Link} from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import './styles.scss'

const Header: FC = () => {
  const auth = getAuth();

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
