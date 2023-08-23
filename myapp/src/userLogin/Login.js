import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { Link} from 'react-router-dom';
import Image from '../Image/OIP.jpg'
import axios from 'axios';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';

import {Dashbord }from '../pages/Dashbord';

const Login = () => {
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: '',
      };
    //   axios.defaults.withCredentials=true

    //   const [state,setState]=useState(initialValues)

      const validationSchema = Yup.object().shape({

                email: Yup.string().email('Invalid email').required('Email is required'),
                password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
                
            });

        

       const  handleSubmit = async(values, { setSubmitting })=>{
                    try{
                      const mydata =  await axios.post('http://localhost:8080/login',values)

                      console.log(mydata.data)
                      let token = mydata.data

                      if(token){
                        alert("Login success")
                        sessionStorage.setItem('x-access-token', JSON.stringify(token));
                        navigate('/Dashbord')
                      }else{
                        alert("in valied dateils")
                      }
                    
                      
                    }catch(err){
                        console.log(err.message)
                    }
       }


  return (
    <div class="container mt-5">
         <div class="row">
            <div class="col">
                <img src={Image} alt='myimage' />
            </div>
            <div class="col mt-4">
                
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue }) => (
                
                <Form>
                    <div className="form-group row mb-3 ">
                        <div className='col'>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <div className='col'>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                    </div>

                    <div className="form-group mb-2">
                        <label><Field type="checkbox" name="acceptTerms" /> Accept Terms & Conditions</label>
                        <ErrorMessage name="acceptTerms" component="div" className="text-danger" />
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <button type="submit" className="btn btn-primary mb-5 mt-1" disabled={isSubmitting}>
                            Submit
                            </button>
                        </div>
                        <div className='col mt-3'>
                        
                            
                        </div>
                    </div>
                </Form>
                
                )}

                </Formik>
                
            </div>
            
        </div>
        
    </div>
  )
}

export default Login