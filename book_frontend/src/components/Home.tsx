import React, { useEffect } from 'react'
import axios from 'axios';
import ButtonField from './ButtonField.js';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5000/home')
        .then(res => {
          console.log(res);
          if(res.data !== "Success"){
            navigate('/login')
          }
        })
        .catch(err => console.log(err))
  }, [])

  function handleLogout(){
    cookieStore.delete("token");
    navigate('/login')
  }
  return (
    <>
    <div>Home</div>
    <ButtonField id="logout" onClick={handleLogout} data="Logout" />
    </>
  )
}
