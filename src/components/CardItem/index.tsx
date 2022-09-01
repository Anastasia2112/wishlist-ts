import { FC, useContext, useState } from 'react';

import { Button, Checkbox, Modal, Space, Tooltip, Form, Input, message, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined, HeartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ICardItem } from '../../models';
import BorderWrapper from '../UI/BorderWrapper';
import './styles.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckContext } from '../context/CheckContext';
import { CheckContextType, WishType } from '../../models';
import { db } from '../../firebase/config';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

const { confirm } = Modal;

const CardItem: FC<ICardItem> = ({ wishItem, func }) => {

  const { updateCheck } = useContext(CheckContext) as CheckContextType;
  const [visible, setVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  // Изменение записи
  const updateWish = async (id: string, values: WishType) => {
    console.log('id: ', id);
    console.log('values: ', values);
    const wishDoc = doc(db, "wishes", id);
    await updateDoc(wishDoc, values)
      .then(message.success('Желание изменено!'))
      .catch(message.error('Ошибка при изменении записи.'))
  }

  // Удаление записи
  const deleteWish = async (id: string) => {
    console.log(`Удолить ${id}`);
    const wishDoc = doc(db, "wishes", id);
    await deleteDoc(wishDoc); 
  }

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

  const onUpdateFinish = (values: WishType) => {
    updateWish(wishItem.id ,values);
    handleUpdateCancel();
  };

  const onUpdateFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
          <div  className='card-price-and-check'>
            <span className='card-price'>{wishItem.price} ₽</span>
            <Checkbox className='card-check' onChange={(e) => onChange(e, wishItem.id)}></Checkbox>
          </div>
          <div className='card-btns'>
            <Space>
              <Tooltip title="Изменить">
                <Button icon={<EditOutlined />} onClick={showUpdateModal}/>
              </Tooltip>
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
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            'name': wishItem.name,
            'link': wishItem.link,
            'price': wishItem.price,
            'img': wishItem.img,
            'category': wishItem.category,
            'desc': wishItem.desc,
          }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Название"
            name="name"
            rules={[{ required: true, message: 'Введите название!' }]}
            >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ссылка"
            name="link"
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label="Цена"
            name="price"
            rules={[{ required: true, message: 'Введите цену!' }]}
          >
            <InputNumber prefix="₽" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Изображение"
            name="img"
            rules={[{ required: true, message: 'Добавьте изображение!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Категория"
            name="category"
            rules={[{ required: true, message: 'Введите категорию!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Описание"
            name="desc"
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 17, span: 2 }} style={{marginBottom: 0}}>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      
    </BorderWrapper>
  );
};

export default CardItem;
