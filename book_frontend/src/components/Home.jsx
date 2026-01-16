import React, { useEffect } from 'react'
import axios from 'axios';

export default function Home() {
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
  return (
    <div>Home</div>
  )
}
