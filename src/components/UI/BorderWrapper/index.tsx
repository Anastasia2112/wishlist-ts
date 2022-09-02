import React, { FC, ReactNode, CSSProperties } from 'react';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Menu, message, Space, Tooltip } from 'antd';

import styles from './BorderWrapper.module.scss';

interface ICardWrapper {
  children: ReactNode,
  clName?: string
};

const BorderWrapper = ({ children, clName }: ICardWrapper) => (
  <div className={styles.cardWrapper + ' ' + clName}>
    { children }
  </div>
);

export default BorderWrapper;