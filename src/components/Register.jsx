import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/register.css';
import { useForm } from "react-hook-form";

const Register = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const handleOnSubmit = async(data) => {
   

   const token = JSON.parse(localStorage.getItem('token'))

   try {
    const response = await fetch('http://localhost:5000/user/register', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({token,data}), 
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Success:', responseData); 
    } else {
      console.error('Error:', response.statusText); 
    }
  } catch (error) {
    console.error('Request failed', error); 
  }
   
    alert('Account created successfully!');
  };

  return (
    <motion.div 
      className="register-form-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Register User</h2>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            {...register('name', { required: "Name is required" })}
            type="text"
            id="name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register('email', { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address" } })}
            type="email"
            id="email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            {...register('phone', { required: "Phone number is required" })}
            type="tel"
            id="phone"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            type="password"
            id="password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
       
        <motion.button 
          type="submit" 
          className="submit-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Client
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Register;
