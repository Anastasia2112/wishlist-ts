import { FC, useContext, useState } from 'react';
import { Button, Checkbox, Modal, Space, Tooltip, Image } from 'antd';
import { EditOutlined, DeleteOutlined, HeartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { FirebaseContextType, ICardItem } from '../../models';
import BorderWrapper from '../UI/BorderWrapper';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import WishForm from '../UI/WishForm';
import { FirebaseContext } from '../context/FirebaseContext';
import { checkStore } from '../../store';
import { observer } from 'mobx-react';
import './styles.scss';
import { v4 } from 'uuid';

const { confirm } = Modal;

const CardItem: FC<ICardItem> = observer(({ wishItem, unicCategs }) => {

  const { deleteWish, updateWish, deleteImgFromStorage } = useContext(FirebaseContext) as FirebaseContextType;
  const [visible, setVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);  

  // Для окна с подробной информацией
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (e: CheckboxChangeEvent, id: string) => {
    checkStore.updateCheck(id);
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
        wishItem.img && deleteImgFromStorage(wishItem.img)
      },
      onCancel() {
      },
    });
  };

  return (
    <BorderWrapper clName={'cardHeight'}>
      <div className='card-wrapper'>
        <div className='card-img-and-text'>
          <Image
            className='card-img'
            src={wishItem.img}
          />
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
              {/* {wishItem.isCompleted && <Tooltip title="Убрать из архива">
                <Button className='card-btn-delete' icon={<CloseOutlined />} onClick={() => console.log('из архива')}/>
              </Tooltip>}
              {!wishItem.isCompleted && <Tooltip title="В архив">
                <Button className='card-btn-complete' icon={<CheckOutlined />} onClick={() => console.log('в архив')}/>
              </Tooltip>} */}
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
        key = {wishItem.id + v4()}
        visible={visible}
        title="Детали"
        onCancel={handleCancel}
        footer={[
          <span className='card-price'>{wishItem.price} ₽</span>
        ]}
      >
        <Image
          className='card-about-img'
            src={wishItem.img}
          />
        <span className='card-category'>{wishItem.category}</span>
        <span className='card-about-name' >{wishItem.name}</span>
        <a className='card-about-link' href={wishItem.link} target="_blank" rel="noreferrer">{wishItem.link}</a>
        <span className='card-about-desc' >{wishItem.desc}</span>
      </Modal>

      <Modal
        key = {wishItem.id + v4()}
        visible={isUpdateModalVisible}
        title="Изменить желание"
        onCancel={handleUpdateCancel}
        footer={[<div className="homepage-add-form-footer"><HeartOutlined /></div>]}
      >
        <WishForm unicCategs={unicCategs} handleCancel={handleUpdateCancel} onFinishFunc={(e) => updateWish(e, wishItem.id)} formType={'edit'} wishItem={wishItem}/>
      </Modal>

    </BorderWrapper>
  );
});

export default CardItem;
