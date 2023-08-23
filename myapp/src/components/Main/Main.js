import React from 'react';
import {BrowserRouter, Route,Routes  } from 'react-router-dom';
import Login from '../../userLogin/Login'
import Dashbord from '../../pages/Dashbord';

const Main = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/Dashbord' element={<Dashbord/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Main