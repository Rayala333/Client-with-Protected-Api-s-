import React from 'react'
import './App.css';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';

const App = () => {
  
  return (
      <div class="container-fluid vh-100 ">
      
        <div class="row"><Header/></div>

        <div className='row '><Main/></div>

        <div className='row fixed-bottom'><Footer/></div>
      
      </div>
  )
}

export default App