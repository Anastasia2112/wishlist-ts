import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Space, Button, Checkbox, Form, Input, Select, Modal, Tooltip  } from 'antd';

import CardsList from '../../components/CardsList';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import BorderWrapper from '../../components/UI/BorderWrapper';
import mock from '../../mock.json';
import { WishType } from '../../models';
import { CheckContext } from '../../components/context/CheckContext';
import { CheckContextType } from '../../models';

import './styles.scss';

const { Option } = Select;

const Homepage: FC  = () => {

  const { checkedWishes, wishCount } = useContext(CheckContext) as CheckContextType;

  const [wishesArr, setWishesArr] = useState<WishType[]>(mock.wishes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');


//   useEffect(() => {
//     console.log(wishCount);
// }, [wishCount]);

  const sortedWishes = useMemo(() => {
    if (selectedSort) {
      switch (selectedSort) {
        case 'Цена по возрастанию':
          return [...wishesArr.sort((a, b) => a.price - b.price)]
        case 'Цена по убыванию':
          return [...wishesArr.sort((a, b) => b.price - a.price)]
        case 'От "А" до "Я"':
          return [...wishesArr.sort((a, b) => a.name.localeCompare(b.name))]
        case 'От "Я" до "А"':
          return [...wishesArr.sort((a, b) => b.name.localeCompare(a.name))]
      }
    }
    return wishesArr;
  }, [selectedSort, wishesArr]);

  const sortedAndFilteredWishes = useMemo(() => {
    if (selectedFilter) {
      return sortedWishes.filter(wish => wish.category == selectedFilter);
    }
    
    return sortedWishes;
  }, [selectedFilter, sortedWishes]);

  //------
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //=------

  const wishesAmount = sortedAndFilteredWishes.reduce(
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

  const sorts: string[] = ['Цена по возрастанию', 'Цена по убыванию', 'От "А" до "Я"', 'От "Я" до "А"'];

  return (
    <section className='homepage'>
      <div className='homepage-nav'>
        <Space>
          <Select onChange={filter => setSelectedFilter(filter)} placeholder="Категория" style={{ width: 160 }} allowClear >
            {unicCategs.map((sort, index) => {
              return <Option key={index} value={sort}>{sort}</Option>
            })}
          </Select>
          <Select onChange={sort => setSelectedSort(sort)} placeholder="Сортировка" style={{ width: 160 }} >{/*  allowClear */}
            {sorts.map((sort, index) => {
              return <Option key={index} value={sort}>{sort}</Option>
            })}
          </Select>
        </Space>
        <Space>
          <Tooltip title="Добавить желание">
            <Button icon={<PlusOutlined />} onClick={showModal} ></Button>
          </Tooltip>
          { checkedWishes.length > 0 && 
          <Tooltip title="Удалить выбранные">
            <Button className='card-btn-delete' icon={<DeleteOutlined />}/>
          </Tooltip>
          }
        </Space>
      </div>

      <Modal
        visible={isModalVisible}
        title="Добавьте новое желание"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
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

          <Form.Item wrapperCol={{ offset: 17, span: 2 }}>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <CardsList wishesArr={sortedAndFilteredWishes}/>

      <BorderWrapper>
        <span className='card-name'>Итого: </span>
        <span className='card-name'>{wishesAmount} ₽</span>
      </BorderWrapper>
      
    </section>
  );
};

export default Homepage;
