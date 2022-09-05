import { collection } from 'firebase/firestore';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/config';
import { FirebaseContextType, WishType } from '../../models';
import mock from '../../mock.json';
import { FirebaseContext } from '../../components/context/FirebaseContext';
import { Button, Modal, Result, Select, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, HeartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import WishForm from '../../components/UI/WishForm';
import CardsList from '../../components/CardsList';
import BorderWrapper from '../../components/UI/BorderWrapper';

const { Option } = Select;

const Archive = () => {
    const { user, deleteWish, updateWish } = useContext(FirebaseContext) as FirebaseContextType;

    // const [wishesDB, setWishesDB] = useState<WishType[]>([]);
    const [wishesDB, setWishesDB] = useState<WishType[]>(mock.wishes);
    const [isDBError, setIsDBError] = useState<boolean>(false);
    const wishesCollectionRef = collection(db, "wishes");
    const [formCategory, setFormCategory] = useState<any>();
  
    // Получение записей из БД
    const getWishes = async () => {
      // try {
      //   const data = await getDocs(wishesCollectionRef)
      //   const arr = data.docs.map(doc => ({...doc.data(), id: doc.id}) as WishType);
      //   const filteredArr = arr.filter(wish => wish.userId === user?.uid);
      //   setWishesDB(filteredArr);
        
      //   setIsDBError(false);
      // } catch (error) {
      //   message.error(`Ошибка загрузки данных. ${error}`)
      //   console.log(error);
      //   setIsDBError(true);
      // }
      console.log('вызвана getWishes()');
    };
  
    useEffect(() => { 
      getWishes();
    }, [deleteWish]);
  
    // как в видео
    // useEffect(() => {
    //   const q = query(collection(db, "wishes"));
    //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     let wishesArray: WishType[] = [];
    //     querySnapshot.forEach((doc) => {
    //       wishesArray.push({...doc.data(), id: doc.id} as WishType)
    //     });
    //     const filteredArr = wishesArray.filter(wish => wish.userId === user?.uid);
    //     setWishesDB(filteredArr);
    //     console.log('unsubscribe() function worked');
    //   })
    //   return () => unsubscribe()
    // }, [])
  
    // Удаление записи
    // const deleteWish = async (id: string) => {
    //   console.log(`Удолить ${id}`);
    //   const wishDoc = doc(db, "wishes", id);
    //   await deleteDoc(wishDoc)
    //     .then(message.success('Желание удалено!'))
    //     .catch(message.error('Ошибка при удалении записи.'))
    // }

  
    // const [wishesArr, setWishesArr] = useState<WishType[]>(mock.wishes);
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
  
    return (
      <section className='homepage'>
        <Link to="/" >Назад</Link><br/><br/>
        <div className='homepage-nav'>
          <div className='homepage-nav-selects'>
            {(wishesDB.length > 0 && !isDBError ) && <Select className='homepage-nav-select' onChange={filter => setSelectedFilter(filter)} placeholder="Категория" style={{ width: 160 }} allowClear >
              {unicCategs.map((sort, index) => {
                return <Option key={index} value={sort}>{sort}</Option>
              })}
            </Select>}
            {(wishesDB.length > 0 && !isDBError ) && <Select className='homepage-nav-select' onChange={sort => setSelectedSort(sort)} placeholder="Сортировка" style={{ width: 160 }} >{/*  allowClear */}
              {sorts.map((sort, index) => {
                return <Option key={index} value={sort}>{sort}</Option>
              })}
            </Select>}
          </div>
        </div>
  
        {isDBError && 
          <Result
            status="warning"
            title="Ошибка загрузки данных"
          />
        }
  
        {(wishesDB.length === 0 && !isDBError) && <p className="homepage-info">Пока записей нет!</p>}
  
        {/* {(wishesDB.length > 0 && !isDBError) && <CardsList wishesArr={sortedAndFilteredWishes} unicCategs={unicCategs}/>} */}
  
        {(wishesDB.length > 0 && !isDBError) && <BorderWrapper>
          <span className='card-name'>Итого: </span>
          <span className='card-name'>{wishesAmount} ₽</span>
        </BorderWrapper>}
        
      </section>
    );
  };

export default Archive