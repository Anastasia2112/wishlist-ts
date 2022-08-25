import { FC, useContext, useState } from 'react';

import { Button, Checkbox, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ICardItem } from '../../models';
import BorderWrapper from '../UI/BorderWrapper';
import './styles.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckContext } from '../context/CheckContext';
import { CheckContextType } from '../../models';

const CardItem: FC<ICardItem> = ({ wishItem, func }) => {

  const { checkedWishes, updateCheck } = useContext(CheckContext) as CheckContextType;

  const test = (): void => {
    console.log('test');
  }

  const onChange = (e: CheckboxChangeEvent, id: string) => {  // первое нажатие - id нет в массиве - добавить
    updateCheck(id);                   // второе нажание - id есть в массиве - удалить
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
      <span className='card-price'>{wishItem.price} ₽</span>
      <div className='card-price-btns'>
        <Checkbox onChange={(e) => onChange(e, wishItem.id)}></Checkbox>
        <Space>
          <Tooltip title="Изменить">
            <Button icon={<EditOutlined />} onClick={() => func('click') }/>
          </Tooltip>
          <Tooltip title="Добавить">
            <Button className='card-btn-delete' icon={<DeleteOutlined />} onClick={() => test() }/>
          </Tooltip>
        </Space> 
      </div>
    </BorderWrapper>
  );
};

export default CardItem;
