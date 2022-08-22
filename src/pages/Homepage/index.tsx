import { FC } from 'react';
import { Space, Button } from 'antd';

import CardsList from '../../components/CardsList';
import DropdownBtn from '../../components/UI/DropdownBtn';
import { PlusOutlined } from '@ant-design/icons';
import mock from '../../mock.json';

import './styles.scss';

const Homepage: FC  = () => {

  let total = 0;
  
  mock.wishes.forEach(item => {
    total += item.price;
  })

  return (
    <section className='homepage'>
      <div className='homepage-nav'>
        <Space>
          <DropdownBtn />
          <DropdownBtn />
        </Space>
        <Button icon={<PlusOutlined />}></Button>
      </div>
      <CardsList />
      <div className='homepage-total'>
        <span className='card-price'>Итого: </span>
        <span className='card-price'>{total} ₽</span>
      </div>
    </section>
  );
};

export default Homepage;
