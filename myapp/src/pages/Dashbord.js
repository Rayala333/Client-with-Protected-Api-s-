import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import login from '../userLogin/Login';

const Dashbord = () => {
  const navigate = useNavigate()
  const [data,setData]=useState([])
  // const [exp,setExp]=useState()

  const token = JSON.parse(sessionStorage.getItem("x-access-token"))
  // console.log(token)


  // const [reload,setReload]=useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps

  console.log(data,"Date")
  const getData = async()=>{
                 const result = await axios.get('http://localhost:8080/user',{headers:{"x-access-token":token}})

                 const userdata = result.data
                 setData(userdata.userDetails)

                //  console.log(userdata,"User")

                      // if(userdata){
                      //   console.log(userdata,"userdata")
                      // }else(
                      //   console.log("No data")
                      // )
            
                      // if(JSON.stringify(userdata.userDetails)!==JSON.stringify(data)){
                      //   setData(userdata)
                      //   // setExp(userdata.Exp)
                      // }
                     }
 
  useEffect(()=>{
    
    
      getData()

  },[])

// console.log(typeof(exp),'exp',exp*1000)
 

  const logoutHandler = ()=>{
  
    sessionStorage.removeItem("x-access-token")

     navigate('/')
  }

  // setTimeout(()=>{
  //   logoutHandler()
  // },2000)

//  console.log(data[1]*1000,'time')
//  console.log(Date.now())
//  if(data.exp * 1000 < Date.now()){
//   logoutHandler()
//  }
 


  return (
    <>
    <p>{data.name}</p>
   
    <button onClick={logoutHandler}>logout</button>
    

    </>
  )
}

export default Dashbord