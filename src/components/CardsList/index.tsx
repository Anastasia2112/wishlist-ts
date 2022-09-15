import { FC, useState } from 'react';
import CardItem from '../CardItem';
import { ICardList } from '../../models';

const CardsList: FC<ICardList> = ({ wishesArr, unicCategs }) => {

  return (
    <section>
      {wishesArr.map((item) => 
        <CardItem key={item.id} wishItem={item} unicCategs={unicCategs} />
      )}
    </section>
  );
};

export default CardsList;
