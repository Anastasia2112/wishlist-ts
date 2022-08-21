import { FC } from 'react';
import './styles.scss';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

import { WishType } from '../../interfaces';


interface ICardItem  { 
  wishType : WishType,
  func : (a: string) => void
}

const CardItem: FC<ICardItem> = ({ wishType, func }) => {

  const test = (): void => {
    console.log('test');
    
  }
  
  return (
    <div className='card-wrapper'>
      <div className='card-content'>
        <div className='card-img'></div>
        <div className='card-info'>
            <span className='card-name'>{wishType.name}</span>
            <a className='card-link'>{wishType.link}</a>
            <span className='card-price'>{wishType.price} ₽</span>
        </div>
      </div>
      <div className='card-btns'>
        <Button className='card-btn-edit' icon={<EditOutlined />} onClick={() => func('click') }/>
        <Button className='card-btn-delete' icon={<DeleteOutlined />} onClick={() => test() }/>
      </div>
        
    </div>

  );
};

export default CardItem;
