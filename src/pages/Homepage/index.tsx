import { FC } from 'react';
import { Space, Button } from 'antd';

import CardsList from '../../components/CardsList';
import DropdownBtn from '../../components/UI/DropdownBtn';
import { PlusOutlined } from '@ant-design/icons';
import mock from '../../mock.json';

import './styles.scss';

const Homepage: FC  = () => {

  const wishesAmount = mock.wishes.reduce(
    function (sum, current) {
      return sum + current.price
    },0
  );

  return (
    <section className='homepage'>
      <div className='homepage-nav'>
        <Space>
          <DropdownBtn btnText={'Категория'} />
          <DropdownBtn btnText={'Сортировка'} />
        </Space>
        <Button icon={<PlusOutlined />}></Button>
      </div>
      <CardsList />
      <div className='homepage-amount'>
        <span className='card-price'>Итого: </span>
        <span className='card-price'>{wishesAmount} ₽</span>
      </div>
    </section>
  );
};

export default Homepage;
