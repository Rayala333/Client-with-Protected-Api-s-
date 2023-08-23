import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from '../userLogin/Login';

const Dashbord = () => {
  const navigate = useNavigate()
  const [data,setData]=useState()

  const token = JSON.parse(sessionStorage.getItem("x-access-token"))
  console.log(token)
  

  const getData = async ()=>{
    const result = await axios.get('http://localhost:8080/details',{
      headers:{"x-access-token":token}
    });

        console.log(result.data,'result')
        setData(result.data)
  }

  console.log(data)

 
  useEffect(()=>{
    !token? navigate('/'):getData() 
  },[data])

  const logoutHandler = ()=>{
    sessionStorage.removeItem("x-access-token")
  }

  return (
    <>{
      !data  && <div>Loading...</div>
    }
    {
      <button onClick={logoutHandler}>logout</button>
    }
    </>
  )
}

export default Dashbord