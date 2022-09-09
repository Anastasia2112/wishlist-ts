
import { FC, useContext, useState } from 'react';
import { Button, Space, Menu, Dropdown, message } from 'antd';
import { MenuOutlined, UserOutlined, LogoutOutlined, CheckSquareOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import TestPage from '../../pages/TestPage';
import { FirebaseContext } from '../context/FirebaseContext';
import { FirebaseContextType } from '../../models';
import { auth } from '../../firebase/config';
import './styles.scss';

const Header: FC = () => {

  const { user, logout } = useContext(FirebaseContext) as FirebaseContextType;

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        message.info(`Ссылка: перейти в профиль`);
        break;
      case '2':
        navigate('/archive');
        break;
      case '3':
        logout();
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
        // {
        //   label: 'Архив',
        //   key: '2',
        //   icon: <CheckSquareOutlined />,
        // },
        {
          label: 'Выйти',
          key: '3',
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

