import React, { FC } from 'react';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Menu, message, Space, Tooltip } from 'antd';
import { IDropdownBtn } from '../../../models';

import style from './DropdownBtn.module.scss';

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = e => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const menu = (
  <Menu
    onClick={handleMenuClick}
    items={[
      {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
      },
      {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
      },
      {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
      },
    ]}
  />
);

const DropdownBtn: FC<IDropdownBtn> = ({ btnText }) => (
  <>
    {/* <Dropdown overlay={menu} className={style.dropdown}> */}
    <Dropdown overlay={menu}>
      <Button>
        <Space>
          {btnText}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  </>
  
);

export default DropdownBtn;