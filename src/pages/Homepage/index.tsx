import { FC, useState } from 'react';
import { Space, Button, Checkbox, Form, Input  } from 'antd';

import CardsList from '../../components/CardsList';
import DropdownBtn from '../../components/UI/DropdownBtn';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import mock from '../../mock.json';

import './styles.scss';
import { format } from 'path';

const Homepage: FC  = () => {

  const [isAddActive, setIsAddActive] = useState<boolean>(false);

  const handleAddClick = (e: any) => {
    setIsAddActive(!isAddActive);
  };

  const wishesAmount = mock.wishes.reduce(
    function (sum, current) {
      return sum + current.price
    },0
  );

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  let categs: string[] = [];

  mock.wishes.forEach((item) => {
    categs.push(item.category)
  });

  let unicCategs: string[] = categs.filter((val, ind, arr) => arr.indexOf(val) === ind);

  const sorts: string[] = ['Цена по возрастанию', 'Цена по убыванию'];

  return (
    <section className='homepage'>
      <div className='homepage-nav'>
        <Space>
          <DropdownBtn btnText={'Категория'} menuItems={unicCategs}/>
          <DropdownBtn btnText={'Сортировка'} menuItems={sorts}/>
        </Space>
        <Button icon={isAddActive ? <CloseOutlined /> : <PlusOutlined />} onClick={(e) => handleAddClick(e)} ></Button>
      </div>

      {/* <div className='homepage-amount' style={isAddActive ? {display: 'block'} : {display: 'none'}}> */}
      {isAddActive && <div className='homepage-amount' >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
          rules={[{ required: true, message: 'Введите ссылку!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Цена"
          name="price"
          rules={[{ required: true, message: 'Введите цену!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Изображение"
          name="img"
          rules={[{ required: true, message: 'Введите цену!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Категория"
          name="category"
          rules={[{ required: true, message: 'Введите цену!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item >
          <Button type='primary' htmlType="submit" icon={<PlusOutlined />}>
            Добавить
          </Button>
        </Form.Item>
      </Form>
      </div>}


      <CardsList />
      <div className='homepage-amount'>
        <span className='card-price'>Итого: </span>
        <span className='card-price'>{wishesAmount} ₽</span>
      </div>
    </section>
  );
};

export default Homepage;
