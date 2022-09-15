import { FC } from 'react';
import './styles.scss';

const NotFound: FC = () => {

  return (
    <section className='notfound-wrapper'>
        <p className='notfound-h1'>404</p>
        <p>Страница не найдена</p>
    </section>
  );
};

export default NotFound;
