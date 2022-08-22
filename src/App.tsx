import { FC, createContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Footer from './components/Footer';
import './default.scss';
import logo from './logo.svg';

interface IFirebaseContext {
  firebase: any;
  auth: any;
  firestore: any;
}

const FirebaseContext = createContext<IFirebaseContext | null>(null);

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
              path="*"
              element={<Navigate to="/" replace/>}
          />
        </Routes>
        
      </div>
      <Footer />
    </div>
  );
}

export default App;
