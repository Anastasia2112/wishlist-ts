
import { FC, useContext, useState } from 'react';
import { Button, Space, Menu, Dropdown, message } from 'antd';
import { MenuOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import TestPage from '../../pages/TestPage';
import { useAuthState } from 'react-firebase-hooks/auth';

import './styles.scss';
import { FirebaseContext } from '../context/FirebaseContext';
import { FirebaseContextType } from '../../models';

const Header: FC = () => {

  const { auth } = useContext(FirebaseContext) as FirebaseContextType;
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut(auth);
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        message.info(`Ссылка перейти в профиль`);
        break;
  
      case '2':
        signOut(auth);
        navigate('/login');
        break;
    }
  };
  
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Профиль',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: 'Выйти',
          key: '2',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <header className='header'>
      <div className='wrap'>
        <Link to="/" className={'header-logo'}>Your Wishlist</Link>
        <Space>
          {/* <Link to="/test">TestPage</Link> */}
          {/* {user && <Link to="/login"><Button onClick={signOutHandler}>Выйти</Button></Link>} */}
          {user &&
            <Dropdown overlay={menu}>
              <a onClick={e => e.preventDefault()}>
                <Space>
                  <span className='header-username'>{user?.email}</span>
                  <MenuOutlined />
                </Space>
              </a>
            </Dropdown>
          }
          
        </Space>
      </div>
    </header>
  );
};

export default Header;

