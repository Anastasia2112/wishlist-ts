import { FC, useState } from 'react';

import CardItem from '../CardItem';
import { ICardList } from '../../models';

// import './styles.scss';

const CardsList: FC<ICardList> = ({ wishesArr, unicCategs }) => {

  const [checkedWishes, setCheckedWishes] = useState<any>([]);

  const addCheckedWish = (newCheck: any) => {
    setCheckedWishes([...checkedWishes, newCheck]);
  }

  return (
    <section>
        {wishesArr.map((item, index) => 
            <CardItem key={index} wishItem={item} unicCategs={unicCategs} />
        )}
    </section>
  );
};

export default CardsList;
