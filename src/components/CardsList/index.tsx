import { FC } from 'react';

import CardItem from '../CardItem';
import mock from '../../mock.json';

// import './styles.scss';

const CardsList: FC = () => {

  const func = (a: string): void => {
    console.log(a);
    
  }

  // console.log(mock.wishes[0].price);

  return (
    <section>
        {mock.wishes.map((item, index) => 
            <CardItem key={index} wishType={item} func={func} />
        )}
    </section>
  );
};

export default CardsList;
