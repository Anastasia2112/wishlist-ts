import React, { FC, ReactNode } from 'react';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Menu, message, Space, Tooltip } from 'antd';

import style from './BorderWrapper.module.scss';

interface ICardWrapper {
  children: ReactNode
}

const CardWrapper = ({ children }: ICardWrapper) => (
  <div className={style.cardWrapper}>
    { children }
  </div>
);

export default CardWrapper;