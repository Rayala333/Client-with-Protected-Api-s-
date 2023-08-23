import React, { useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from '../userLogin/Login';

const Dashbord = () => {
  const navigate = useNavigate()

  const token = JSON.parse(sessionStorage.getItem("x-access-token"))
  console.log(token)
  

  const getData = async ()=>{
    const result = await axios.get('http://localhost:8080/details',{
      headers:{"x-access-token":token}
    });

        console.log(result.data,'result')
  }

 
  useEffect(()=>{
    if(!token){
      navigate('/')
    }else{
      getData()
    }  
  },[])

  return (
    <div>Dashbord</div>
  )
}

export default Dashbord