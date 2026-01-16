import React from 'react'
import InputField from './InputField'
import ButtonField from './ButtonField'
import './Registrationform.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registration() {
  const [email, setEmail] =useState()
  const [password, setPassword] =useState()
  const [confirmpassword, setConfirmPassword] =useState()
  const navigate = useNavigate();

  

  function validate(e){
    e.preventDefault();
    if(password === confirmpassword){
      if(password.length >= 6){
        axios.post('http://localhost:5000/register', {email, password})
        .then(res => {
          console.log(res);
          navigate('/login')
        })
        .catch(err => console.log(err))
      }else{
        alert('password must be greater than equal to 6')
      }
    }else {
      alert("password and confirm password must be same!")
    }
  }
  return (
    <>
    <h3>Sign Up</h3>
    <form className='formContainer'>
        <InputField type="email" id="email" placeholder="Enter email" autocomplete="off" onChange={(e)=> setEmail(e.target.value)}/>
        <InputField type="password" id="password" placeholder="Enter password" autocomplete="off" onChange={(e)=> setPassword(e.target.value)}/>
        <InputField type="password" id="confirm-password" placeholder="Enter confirm password" autoComplete="off" onChange={(e)=> setConfirmPassword(e.target.value)}/>
        <ButtonField id="submit" for="Register" onClick={validate}/>
    </form>
    <p>Already have Account</p>
    <Link to='/login'>Login</Link>
    </>
  )
}
