import { FC, useContext, useState } from 'react';

import { Button, Checkbox, Modal, Space, Tooltip, message } from 'antd';
import { EditOutlined, DeleteOutlined, HeartOutlined, ExclamationCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { FirebaseContextType, ICardItem } from '../../models';
import BorderWrapper from '../UI/BorderWrapper';
import './styles.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckContext } from '../context/CheckContext';
import { CheckContextType, WishType } from '../../models';
import { db } from '../../firebase/config';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import WishForm from '../UI/WishForm';
import { FirebaseContext } from '../context/FirebaseContext';

const { confirm } = Modal;

const CardItem: FC<ICardItem> = ({ wishItem, unicCategs }) => {

  const { updateCheck } = useContext(CheckContext) as CheckContextType;
  const { deleteWish, updateWish } = useContext(FirebaseContext) as FirebaseContextType;
  const [visible, setVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);  

  // Изменение записи
  // const updateWish = async (editWish: WishType, id: string) => {
  //   console.log('id: ', id);
  //   console.log('values: ', editWish);
  //   const wishDoc = doc(db, "wishes", id);
  //   await updateDoc(wishDoc, editWish)
  //     .then(message.success('Желание изменено!'))
  //     .catch(message.error('Ошибка при изменении записи.'))
  // }

  // Удаление записи
  // const deleteWish = async (id: string) => {
  //   console.log(`Удолить ${id}`);
  //   const wishDoc = doc(db, "wishes", id);
  //   await deleteDoc(wishDoc)
  //     .then(message.success('Желание удалено!'))
  //     .catch(message.error('Ошибка при удалении записи.'))
  // }

  // Для окна с подробной информацией
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (e: CheckboxChangeEvent, id: string) => {
    updateCheck(id);
  };

  // Для формы изменения
  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  // Предупреждение об удалении
  const showDeleteConfirm = () => {
    confirm({
      title: 'Удалить эту запись?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        deleteWish(wishItem.id)
      },
      onCancel() {
      },
    });
  };

  return (
    <BorderWrapper clName={'cardHeight'}>
      <div className='card-wrapper'>
        <div className='card-img-and-text'>
          <div className='card-img' onClick={showModal}></div>
          <div className='card-info'>
              <span className='card-name' onClick={showModal}>{wishItem.name}</span>
              <a className='card-link' href={wishItem.link} target="_blank" rel="noreferrer">{wishItem.link}</a>
              <span className='card-category'>{wishItem.category}</span>
          </div>
        </div>
        <div className='card-price-and-btns'>
          {wishItem.isCompleted
          ?
            <span className='card-price'>{wishItem.price} ₽</span>
          :
            <div  className='card-price-and-check'>
              <span className='card-price'>{wishItem.price} ₽</span>
              <Checkbox className='card-check' onChange={(e) => onChange(e, wishItem.id)}></Checkbox>
            </div>}
          <div className='card-btns'>
            <Space>
              {wishItem.isCompleted && <Tooltip title="Убрать из архива">
                <Button className='card-btn-delete' icon={<CloseOutlined />} onClick={() => console.log('из архива')}/>
              </Tooltip>}
              {!wishItem.isCompleted && <Tooltip title="В архив">
                <Button className='card-btn-complete' icon={<CheckOutlined />} onClick={() => console.log('в архив')}/>
              </Tooltip>}
              {!wishItem.isCompleted && <Tooltip title="Изменить">
                <Button icon={<EditOutlined />} onClick={showUpdateModal}/>
              </Tooltip>}
              <Tooltip title="Удалить">
                <Button className='card-btn-delete' icon={<DeleteOutlined />} onClick={showDeleteConfirm}/>
              </Tooltip>
            </Space> 
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        title="Детали"
        onCancel={handleCancel}
        footer={[
          <span className='card-price'>{wishItem.price} ₽</span>
        ]}
      >
        <div className='card-about-img' >{wishItem.img}</div>
        <span className='card-category'>{wishItem.category}</span>
        <span className='card-about-name' >{wishItem.name}</span>
        <a className='card-about-link' href={wishItem.link} target="_blank" rel="noreferrer">{wishItem.link}</a>
        <span className='card-about-desc' >{wishItem.desc}</span>
      </Modal>

      <Modal
        visible={isUpdateModalVisible}
        title="Изменить желание"
        onCancel={handleUpdateCancel}
        footer={[<div className="homepage-add-form-footer"><HeartOutlined /></div>]}
      >
        <WishForm unicCategs={unicCategs} handleCancel={handleUpdateCancel} onFinishFunc={(e) => updateWish(e, wishItem.id)} formType={'edit'} wishItem={wishItem}/>
      </Modal>

    </BorderWrapper>
  );
};

export default CardItem;
