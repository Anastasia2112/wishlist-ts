import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Space, Button, Checkbox, Form, Input, Select, Modal, Tooltip  } from 'antd';

import CardsList from '../../components/CardsList';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import BorderWrapper from '../../components/UI/BorderWrapper';
import mock from '../../mock.json';
import { FirebaseContextType, WishType } from '../../models';
import { CheckContext } from '../../components/context/CheckContext';
import { CheckContextType } from '../../models';
import { db } from '../../firebase/config';
import { ref, onValue} from "firebase/database";

import './styles.scss';
import { FirebaseContext } from '../../components/context/FirebaseContext';
import { collection, doc, getDocs } from 'firebase/firestore';

const { Option } = Select;

const Homepage: FC  = () => {

  // const { firestore } = useContext(FirebaseContext) as FirebaseContextType;

  const [wishesDB, setWishesDB] = useState<WishType[]>([]);
  const wishesCollectionRef = collection(db, "wishes");

  useEffect(() => { 
    const getWishes = async () => {
      const data = await getDocs(wishesCollectionRef);
      setWishesDB(data.docs.map(doc => ({...doc.data(), id: doc.id}) as WishType));
    };

    getWishes();
  }, [])

  const { wishCount } = useContext(CheckContext) as CheckContextType;

  // const [wishesArr, setWishesArr] = useState<WishType[]>(mock.wishes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const sortedWishes = useMemo(() => {
    if (selectedSort) {
      switch (selectedSort) {
        case 'Цена по возрастанию':
          return [...wishesDB.sort((a, b) => a.price - b.price)]
        case 'Цена по убыванию':
          return [...wishesDB.sort((a, b) => b.price - a.price)]
        case 'От "А" до "Я"':
          return [...wishesDB.sort((a, b) => a.name.localeCompare(b.name))]
        case 'От "Я" до "А"':
          return [...wishesDB.sort((a, b) => b.name.localeCompare(a.name))]
      }
    }
    return wishesDB;
  }, [selectedSort, wishesDB]);

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
  //------

  const wishesAmount = sortedAndFilteredWishes.reduce(
    function (sum, current) {
      return sum + current.price;
    }, 0
  );

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  let categs: string[] = [];

  wishesDB.forEach((item) => {
    categs.push(item.category)
  });

  let unicCategs: string[] = categs.filter((val, ind, arr) => arr.indexOf(val) === ind);

  const sorts: string[] = ['Цена по возрастанию', 'Цена по убыванию', 'От "А" до "Я"', 'От "Я" до "А"'];

  return (
    <section className='homepage'>
      <div className='homepage-nav'>
        <div className='homepage-nav-selects'>
          <Select className='homepage-nav-select' onChange={filter => setSelectedFilter(filter)} placeholder="Категория" style={{ width: 160 }} allowClear >
            {unicCategs.map((sort, index) => {
              return <Option key={index} value={sort}>{sort}</Option>
            })}
          </Select>
          <Select className='homepage-nav-select' onChange={sort => setSelectedSort(sort)} placeholder="Сортировка" style={{ width: 160 }} >{/*  allowClear */}
            {sorts.map((sort, index) => {
              return <Option key={index} value={sort}>{sort}</Option>
            })}
          </Select>
        </div>
        <div className='homepage-nav-btns'>
          <Tooltip title="Добавить желание">
            <Button className='homepage-nav-btn' icon={<PlusOutlined />} onClick={showModal} ></Button>
          </Tooltip>
          { wishCount > 0 && 
          <Tooltip title="Удалить выбранные">
            <Button className='homepage-nav-btn card-btn-delete' icon={<DeleteOutlined />}/>
          </Tooltip>
          }
        </div>
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
            rules={[{ required: true, message: 'Введите категорию!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Описание"
            name="desc"
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 17, span: 2 }} style={{marginBottom: 0}}>
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
