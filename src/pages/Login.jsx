import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {

  const [focused, setFocused] = useState(false);
  let naviagte = useNavigate();



  const { register, handleSubmit, formState: { errors }, } = useForm();

  const handleonSubmit = async(data) => {

    if(data?.email || data?.pass){
  
      let email = data.email;
      let pass = data.pass;
    try {
      const res =await fetch('http://localhost:5000/admin/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,pass})
      })

      if(res.ok){
        const data = await res.json()
        console.log(data.user);
        
        localStorage.setItem('token',JSON.stringify(data?.token))
        localStorage.setItem('user',JSON.stringify(data?.user))
       return naviagte('/dashboard');

      }
      
    } catch (error) {
      console.log(error);
      
    }

    }

   
  
   
    
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(handleonSubmit)} className='login'>
        <div className={`custom-input ${focused || 'value' ? 'focused' : ''}`}>
        <label>Email Address</label>
      <input
        type="email"
        name="email"
        {...register('email', { required: true })}
        required
        
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
     
    </div>
        <div className={`custom-input ${focused || 'value' ? 'focused' : ''}`}>
        <label>pass</label>
      <input
        type="password"
        name="pass"
        required
        {...register('pass', { required: true })}
        

        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      
    </div> 
          <button type="submit">
            Sign In
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default Login;