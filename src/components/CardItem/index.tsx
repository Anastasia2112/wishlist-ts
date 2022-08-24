import { FC, useState } from 'react';

import { Button, Checkbox, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ICardItem } from '../../models';
import BorderWrapper from '../UI/BorderWrapper';
import './styles.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const CardItem: FC<ICardItem> = ({ wishItem, func, addCheck }) => {

  const [check, setCheck] = useState<any>({ev: '', id: ''});

  const test = (): void => {
    console.log('test');
  }

  const onChange = (e: CheckboxChangeEvent, id: string) => {
    console.log(e.target.checked, id);
    // const newCheck = () => {
    //   setCheck(...check, ev: e.target.checked)
    // }
  };
   
  return (
    <BorderWrapper >
      <div className='card-content'>
        <div className='card-img'></div>
        <div className='card-info'>
            <span className='card-name'>{wishItem.name}</span>
            <a className='card-link' href={wishItem.link} target="_blank">{wishItem.link}</a>
            <span className='card-category'>{wishItem.category}</span>
        </div>
      </div>
      <div className='card-price-btns'>
          <span className='card-price'>{wishItem.price} ₽</span>
          <Space>
            <Button icon={<EditOutlined />} onClick={() => func('click') }/>
            <Button className='card-btn-delete' icon={<DeleteOutlined />} onClick={() => test() }/>
          </Space> 
          <Checkbox onChange={(e) => onChange(e, wishItem.id)}></Checkbox>
      </div>
    </BorderWrapper>
  );
};

export default CardItem;
