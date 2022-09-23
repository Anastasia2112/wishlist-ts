import { FC } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './default.scss';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react';

const App: FC = observer(() => {

  return (
      <div className="App">
          <Header />
          <div className="main">
            <AppRouter />
          </div>
          <Footer />
      </div>
  );
});

export default App;
