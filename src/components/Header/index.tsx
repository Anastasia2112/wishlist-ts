import { FC, useContext } from 'react';
import { Space, Menu, Dropdown, message } from 'antd';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from '../context/FirebaseContext';
import { FirebaseContextType } from '../../models';
import { observer } from 'mobx-react';
import { userStore } from '../../store';
import './styles.scss';

const Header: FC = observer(() => {

  const { logout } = useContext(FirebaseContext) as FirebaseContextType;
  const user = JSON.parse(userStore.user!);

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        logout();
        navigate('/login');
        break;
      case '2':
        navigate('/archive');
        break;
      case '3':
        message.info(`Ссылка: перейти в профиль`);
        break;
    }
  };
  
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Выйти',
          key: '1',
          icon: <LogoutOutlined />,
        },
        // {
        //   label: 'Архив',
        //   key: '2',
        //   icon: <CheckSquareOutlined />,
        // },
        // {
        //   label: 'Профиль',
        //   key: '3',
        //   icon: <UserOutlined />,
        // },
      ]}
    />
  );

  return (
    <header className='header'>
      <div className='wrap'>
        <Link to="/" className={'header-logo'}>Your Wishlist</Link>
        <Space>
          {user &&
            <Dropdown overlay={menu} className='header-dropdown'>
                <Space>
                  <span className='header-username'>{user?.email}</span>
                  <MenuOutlined />
                </Space>
            </Dropdown>
          } 
          
        </Space>
      </div>
    </header>
  );
});

export default Header;

