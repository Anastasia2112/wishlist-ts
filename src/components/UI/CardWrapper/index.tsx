import React, { FC, ReactNode } from 'react';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Menu, message, Space, Tooltip } from 'antd';

import style from './CardWrapper.module.scss';

const CardWrapper = ( props: {children: ReactNode} ) => (
  <div className={style.cardWrapper}>
    {props.children}
  </div>
);

export default CardWrapper;