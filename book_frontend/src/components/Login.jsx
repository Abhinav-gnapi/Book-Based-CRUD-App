import React from 'react'
import InputField from './InputField'
import ButtonField from './ButtonField'
import './Registrationform.css'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', {email,password})
    .then(res => {
      if(res.data === "Success"){
        navigate('/home')
      } else {
        console.log("Wrong password!")
      }
    })
    .catch(err => console.error(err))
  }

  return (
    <>
        <h3>Login</h3>
        <form className='formContainer' onSubmit={handleLogin}>
                <InputField type="email" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                <InputField type="password" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                <ButtonField id="login" data="Login" />
        </form>
    </>
  )
}
