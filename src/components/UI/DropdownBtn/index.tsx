import React, { FC } from 'react';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Menu, message, Space, Tooltip } from 'antd';
import { IDropdownBtn } from '../../../models';

import style from './DropdownBtn.module.scss';

const handleMenuClick: MenuProps['onClick'] = e => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const DropdownBtn: FC<IDropdownBtn> = ({ btnText, menuItems }) =>  {

  type TMenyItem = {
    label: string,
    key: number
  }

  let k: number = 0;
  let items2: TMenyItem[] = [];

  menuItems.forEach((item) => {
    k++;
    items2.push({ label: item, key: k });
  });

  const menu = (
    <Menu 
      onClick={handleMenuClick}
      items={items2}
    />
  )

  return (
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
}
export default DropdownBtn;