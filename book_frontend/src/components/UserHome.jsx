import React from 'react'
import ButtonField from './ButtonField'
import { useNavigate } from 'react-router-dom';

export default function UserHome() {
    const navigate = useNavigate();
    
    function handleLogout(){
        cookieStore.delete("token");
        navigate('/login')
    }
    
  return (
    <>
    <div>UserHome</div>
    <ButtonField id="logout" onClick={handleLogout} data="Logout" />
    </>
  )
}
