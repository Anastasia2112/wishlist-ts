
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FirebaseContext } from '../context/FirebaseContext';
import './styles.scss'
import { FirebaseContextType } from '../../models';

const Header: FC = () => {

  const { auth } = useContext(FirebaseContext) as FirebaseContextType;

  return (
    <header className='header'>
      <div className='wrap'>
        <span className={'header-logo'}>Your Wishlist</span>
        {/* <Button><Link to="/registration">Войти</Link></Button> */}
        <Space>
          {/* <span>{isAuth ? 'Авторизован' : 'Не авт'}</span> */}
          <Button><Link to="/login">Войти</Link></Button>
          <Link to="/login"><Button onClick={() => {signOut(auth)}}>Выйти</Button></Link>
        </Space>
      </div>
    </header>
  );
};

export default Header;
