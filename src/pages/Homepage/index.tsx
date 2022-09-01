import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, Select, Modal, Tooltip, message, InputNumber, Result  } from 'antd';
import { PlusOutlined, DeleteOutlined, HeartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import CardsList from '../../components/CardsList';
import BorderWrapper from '../../components/UI/BorderWrapper';
import mock from '../../mock.json';
import { FirebaseContextType, WishType } from '../../models';
import { CheckContext } from '../../components/context/CheckContext';
import { CheckContextType } from '../../models';
import { db } from '../../firebase/config';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { FirebaseContext } from '../../components/context/FirebaseContext';

import './styles.scss';

const { Option } = Select;
const { confirm } = Modal;

const Homepage: FC  = () => {

  const { user } = useContext(FirebaseContext) as FirebaseContextType;

  const [wishesDB, setWishesDB] = useState<WishType[]>([]);
  // const [wishesDB, setWishesDB] = useState<WishType[]>(mock.wishes);
  const [isDBError, setIsDBError] = useState<boolean>(false);
  const wishesCollectionRef = collection(db, "wishes");


  // Получение записей из БД
  const getWishesFromDB = useCallback(() => {
    const getWishes = async () => {
      try {
        const data = await getDocs(wishesCollectionRef)
        setWishesDB(data.docs.map(doc => ({...doc.data(), id: doc.id}) as WishType));
        setIsDBError(false);
      } catch (error) {
        message.error(`Ошибка загрузки данных. ${error}`)
        console.log(error);
        setIsDBError(true);
      }
    };

    getWishes();
  }, [])

  useEffect(() => { 
    getWishesFromDB()
  }, [getWishesFromDB]);

  // Создание новой записи
  const createWish = async (formData: WishType) => {
    let newWish = {...formData, userId: user?.uid}
    await addDoc(wishesCollectionRef, newWish)
      .then(message.success('Желание добавлено!'))
      .catch(message.error('Ошибка при добавлении записи.'))
  };

  // Удаление записи
  const deleteWish = async (id: string) => {
    console.log(`Удолить ${id}`);
    const wishDoc = doc(db, "wishes", id);
    await deleteDoc(wishDoc); 
  }

  // Удаление выбранных записей
  const deleteCheckedWishes = (arrOfCheched: string[]) => {
    arrOfCheched.forEach(id => {
      deleteWish(id);
    });
  }

  // Число отмеченных записей
  const { wishCount, checkedWishes } = useContext(CheckContext) as CheckContextType;

  // const [wishesArr, setWishesArr] = useState<WishType[]>(mock.wishes);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  // Сортировка записей
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

  // Фильтрация отсортиованных записей
  const sortedAndFilteredWishes = useMemo(() => {
    if (selectedFilter) {
      return sortedWishes.filter(wish => wish.category ===  selectedFilter);
    }
    
    return sortedWishes;
  }, [selectedFilter, sortedWishes]);

  // Рассчет суммы
  const wishesAmount = sortedAndFilteredWishes.reduce(
    function (sum, current): number {
      return sum + +current.price;
    }, 0
  );

  // Добавление уникальных категорий в отдельный массив для выпадающего списка
  let categs: string[] = [];

  wishesDB.forEach((item) => {
    categs.push(item.category)
  });

  let unicCategs: string[] = categs.filter((val, ind, arr) => arr.indexOf(val) === ind);

  const sorts: string[] = ['Цена по возрастанию', 'Цена по убыванию', 'От "А" до "Я"', 'От "Я" до "А"'];

  // Для формы добавления
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const onAddFinish = (values: WishType) => {
    createWish(values);
    handleAddCancel();
  };

  const onAddFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const showDeleteCheckedConfirm = () => {
    confirm({
      title: 'Удалить выбранные записи?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        deleteCheckedWishes(checkedWishes)
      },
      onCancel() {
      },
    });
  };

  return (
    <section className='homepage'>
      <div className='homepage-nav'>
        <div className='homepage-nav-selects'>
          {wishesDB.length > 0 && <Select className='homepage-nav-select' onChange={filter => setSelectedFilter(filter)} placeholder="Категория" style={{ width: 160 }} allowClear >
            {unicCategs.map((sort, index) => {
              return <Option key={index} value={sort}>{sort}</Option>
            })}
          </Select>}
          {wishesDB.length > 0 && <Select className='homepage-nav-select' onChange={sort => setSelectedSort(sort)} placeholder="Сортировка" style={{ width: 160 }} >{/*  allowClear */}
            {sorts.map((sort, index) => {
              return <Option key={index} value={sort}>{sort}</Option>
            })}
          </Select>}
        </div>
        <div className='homepage-nav-btns'>
          {(wishesDB.length === 0 && !isDBError) && <span className='homepage-nav-btns-info'>Добавьте желание:</span>}
          {!isDBError && <Tooltip title="Добавить желание">
            <Button className='homepage-nav-btn' icon={<PlusOutlined />} onClick={showAddModal} ></Button>
          </Tooltip>}
          { wishCount > 0 && 
          <Tooltip title="Удалить выбранные">
            <Button className='homepage-nav-btn card-btn-delete' icon={<DeleteOutlined />}  onClick={showDeleteCheckedConfirm} />
          </Tooltip>
          }
        </div>
      </div>

      <Modal
        visible={isAddModalVisible}
        title="Добавьте новое желание"
        onCancel={handleAddCancel}
        footer={[<div className="homepage-add-form-footer"><HeartOutlined /></div>]}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
             'link': "",
             'desc': "",
            }}
          onFinish={onAddFinish}
          onFinishFailed={onAddFinishFailed}
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
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {isDBError && 
        <Result
          status="warning"
          title="Ошибка загрузки данных"
        />
      }

      {(wishesDB.length === 0 && !isDBError) && <p className="homepage-info">Пока записей нет!</p>}

      {(wishesDB.length > 0 && !isDBError) && <CardsList wishesArr={sortedAndFilteredWishes}/>}

      {(wishesDB.length > 0 && !isDBError) && <BorderWrapper>
        <span className='card-name'>Итого: </span>
        <span className='card-name'>{wishesAmount} ₽</span>
      </BorderWrapper>}
      
    </section>
  );
};

export default Homepage;
