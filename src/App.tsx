import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import './default.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Homepage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
