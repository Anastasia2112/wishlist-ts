import { FC } from 'react';
import './styles.scss';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { ICardItem } from '../../models';
// import CardWrapper from '../UI/CardWrapper';

const CardItem: FC<ICardItem> = ({ wishItem, func }) => {

  const test = (): void => {
    console.log('test');
  }
  
  return (
    <div className='card-wrapper'>
      <div className='card-content'>
        <div className='card-img'></div>
        <div className='card-info'>
            <span className='card-name'>{wishItem.name}</span>
            <a className='card-link' href={wishItem.link} target="_blank">{wishItem.link}</a>
            <span className='card-category'>{wishItem.category}</span>
            {/* <span className='card-price'>{wishType.price} ₽</span> */}
        </div>
      </div>
      <div className='card-price-btns'>
          <span className='card-price'>{wishItem.price} ₽</span>
          <Space>
            <Button icon={<EditOutlined />} onClick={() => func('click') }/>
            <Button className='card-btn-delete' icon={<DeleteOutlined />} onClick={() => test() }/>
          </Space> 
      </div>
    </div>
  );
};

export default CardItem;
