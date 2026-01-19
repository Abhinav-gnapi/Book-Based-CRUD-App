import React from 'react'
import InputField from './InputField'
import ButtonField from './ButtonField'
import './Registrationform.css'
import { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    await api.post('http://localhost:5000/login', {email,password})
    .then(res => {
      console.log(res.data)
      if(res.data.user.success === true){
        if(res.data.user.role === "admin"){
          navigate("/adminHome")
        } else {
          navigate("/userHome")
        }
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
