import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'


const Header = () => {
    

  return (

    <nav class="navbar navbar-dark bg-primary ">
        
        <div class="container-fluid">

                <logo className='text'>HCL<sub>Tech</sub></logo>

                <div className='navbar'>
                    welcome to the my page please login   
                </div>

        </div>
        
    </nav>
    
  )

}

export default Header