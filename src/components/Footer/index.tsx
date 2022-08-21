import React, { FC } from 'react';
import './styles.scss';
import { HeartOutlined } from '@ant-design/icons';

const Footer: FC = () => {
  return (
    <footer className='footer'>
      <HeartOutlined  className='footer-icon'/>
    </footer>
  );
};

export default Footer;
