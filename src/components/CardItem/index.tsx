import { FC, useContext, useState } from 'react';

import { Button, Checkbox, Modal, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ICardItem } from '../../models';
import BorderWrapper from '../UI/BorderWrapper';
import './styles.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckContext } from '../context/CheckContext';
import { CheckContextType } from '../../models';

const CardItem: FC<ICardItem> = ({ wishItem, func }) => {

  const { checkedWishes, updateCheck } = useContext(CheckContext) as CheckContextType;
  const [visible, setVisible] = useState(false);

  const test = (): void => {
    console.log('test');
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (e: CheckboxChangeEvent, id: string) => {  // первое нажатие - id нет в массиве - добавить
    updateCheck(id);                   // второе нажание - id есть в массиве - удалить
  };

  return (
    <BorderWrapper >
      <div className='card-content'>
        <div className='card-img' onClick={showModal}></div>
        <div className='card-info'>
            <span className='card-name' onClick={showModal}>{wishItem.name}</span>
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
      <Modal
        visible={visible}
        title="Title"
        onCancel={handleCancel}
        footer={[
          <span className='card-price'>{wishItem.price} ₽</span>
        ]}
      >
        <div className='card-about-img' >{wishItem.img}</div>
        <span className='card-category'>{wishItem.category}</span>
        <span className='card-about-name' >{wishItem.name}</span>
        <a className='card-about-link' href={wishItem.link} target="_blank">{wishItem.link}</a>
        <span className='card-about-desc' >{wishItem.desc}</span>
      </Modal>
    </BorderWrapper>
  );
};

export default CardItem;
