import { Button } from 'antd';
import { FC } from 'react';
import {Link} from "react-router-dom";
import './styles.scss'

const Header: FC = () => {
  return (
    <header className='header'>
      <div className='wrap'>
        <Link to="/" className={'header-logo'}>Your Wishlist</Link>
        {/* <Button><Link to="/registration">Войти</Link></Button> */}
        <Button><Link to="/login">Войти</Link></Button>
      </div>
    </header>
  );
};

export default Header;
