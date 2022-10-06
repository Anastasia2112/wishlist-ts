import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Button, Select, Modal, Tooltip, Result } from 'antd';
import { PlusOutlined, DeleteOutlined, HeartOutlined, ExclamationCircleOutlined, LeftOutlined, StarOutlined, CheckOutlined } from '@ant-design/icons';
import CardsList from '../../components/CardsList';
import BorderWrapper from '../../components/UI/BorderWrapper';
import mock from '../../mock.json';
import { FirebaseContextType, WishType } from '../../models';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FirebaseContext } from '../../components/context/FirebaseContext';
import WishForm from '../../components/UI/WishForm';
import ToTopBtn from '../../components/UI/ToTopBtn';
import Loader from '../../components/Loader';
import { userStore, checkStore } from '../../store';
import { observer } from 'mobx-react-lite';
import './styles.scss';
import { v4 } from 'uuid';
import { IHomepage } from '../../models';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { confirm } = Modal;

const Homepage: FC<IHomepage>  = observer(({ isArchive }) => {

  const { deleteWish, createNewWish } = useContext(FirebaseContext) as FirebaseContextType;
  const navigate = useNavigate();

  const user = JSON.parse(userStore.user!);

  const [wishesDB, setWishesDB] = useState<WishType[]>([]);
  // const [wishesDB, setWishesDB] = useState<WishType[]>(mock.wishes);
  const [isDBError, setIsDBError] = useState<boolean>(false);
  const [isWishesLoading, setIsWishesLoading] = useState<boolean>(false);

  // Получение записей из БД
  useEffect(() => {
    setIsWishesLoading(true);
    // setIsGranted(isArchive);
    checkStore.setIsGranted(isArchive);
    const q = query(collection(db, "wishes"), where("userId", "==", user?.uid), where("isGranted", "==", isArchive));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        let wishesArray: WishType[] = [];
        querySnapshot.forEach((doc) => {
          wishesArray.push({...doc.data(), id: doc.id} as WishType)
        });
        setWishesDB(wishesArray);
        console.log('unsubscribe() function worked');
        setIsWishesLoading(false);
      } catch (error) {
        setIsDBError(true);
        console.log(error);
      }
    })
    return () => unsubscribe()
  }, [isArchive])

  // Удаление выбранных записей
  const deleteCheckedWishes = (arrOfCheched: string[]) => {
    arrOfCheched.forEach(id => {
      // deleteCheck(id);
      deleteWish(id);
      checkStore.deleteCheck(id);
    });
  }

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('Сначала новые');
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
        case 'Сначала старые':
          return [...wishesDB.sort((a, b) => a.created - b.created)]
        case 'Сначала новые':
          return [...wishesDB.sort((a, b) => b.created - a.created)]
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

  const sorts: string[] = ['Сначала новые', 'Сначала старые', 'Цена по возрастанию', 'Цена по убыванию', 'От "А" до "Я"', 'От "Я" до "А"'];

  // Для окна с формой добавления
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const showDeleteCheckedConfirm = () => {
    confirm({
      title: 'Удалить выбранные записи?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        deleteCheckedWishes(checkStore.checkedWishes)
      },
      onCancel() {
      },
    });
  };

  const ArchiveHeader = () => {
    return (
      <div className='homepage-archive-wrapper'>
        <Button icon={<LeftOutlined />} onClick={() => navigate('/')}>Назад</Button>
        <h1 className='homepage-archive-header'>Архив <StarOutlined /></h1>
      </div>
    )
  }

  if (isWishesLoading) return <Loader />;

  return (
    <section className='homepage'>
      <ToTopBtn />
      {checkStore.isGranted && <ArchiveHeader />}
      <div className='homepage-nav'>
        <div className='homepage-nav-selects'>
          {(wishesDB.length > 0 && !isDBError ) && <Select className='homepage-nav-select' onChange={filter => setSelectedFilter(filter)} placeholder="Категория" style={{ width: 160 }} allowClear >
            {unicCategs.map((sort) => {
              return <Option key={v4()} value={sort}>{sort}</Option>
            })}
          </Select>}
          {(wishesDB.length > 0 && !isDBError ) && <Select className='homepage-nav-select' defaultValue={sorts[0]} onChange={sort => setSelectedSort(sort)} placeholder="Сортировка" style={{ width: 160 }} >{/*  allowClear */}
            {sorts.map((sort) => {
              return <Option key={v4()} value={sort}>{sort}</Option>
            })}
          </Select>}
        </div>
        <div className='homepage-nav-btns'>
          {(wishesDB.length === 0 && !isDBError && !isWishesLoading && !isArchive) && <span className='homepage-nav-btns-info'>Добавьте желание:</span>}
          {(!isDBError && !isWishesLoading && !isArchive) && <Tooltip title="Добавить желание">
              <Button className='homepage-nav-btn' icon={<PlusOutlined />} onClick={showAddModal} ></Button>
            </Tooltip>}
          { checkStore.checkedWishes.length > 0 && // wishCount > 0 && 
            <Tooltip title="Удалить выбранные">
              <Button className='homepage-nav-btn card-btn-delete' icon={<DeleteOutlined />}  onClick={showDeleteCheckedConfirm} />
            </Tooltip>
          }
        </div>
      </div>

      <Modal
        key = {v4()}
        visible={isAddModalVisible}
        title="Добавьте новое желание"
        onCancel={handleAddCancel}
        // footer={[<div className="homepage-add-form-footer"><HeartOutlined /></div>]}
        footer={
          // [ <div className="homepage-add-form-footer"><HeartOutlined /></div> ]
          null
        }
      >
        <WishForm unicCategs={unicCategs} handleCancel={handleAddCancel} onFinishFunc={createNewWish} formType={'add'}/>
      </Modal>

      {isDBError && 
        <Result
          status="warning"
          title="Ошибка загрузки данных"
        />
      }

      {(wishesDB.length === 0 && !isDBError && !isWishesLoading) && <p className="homepage-info">Пока желаний нет!</p>}

      {(wishesDB.length > 0 && !isDBError) && <CardsList wishesArr={sortedAndFilteredWishes} unicCategs={unicCategs}/>}

      {(wishesDB.length > 0 && !isDBError) && <BorderWrapper>
        <span className='card-name'>Итого: </span>
        <span className='card-name'>{wishesAmount} ₽</span>
      </BorderWrapper>}
      
    </section>
  );
});

export default Homepage;

