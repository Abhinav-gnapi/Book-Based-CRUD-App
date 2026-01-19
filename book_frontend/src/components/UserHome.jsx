import React from 'react'
import ButtonField from './ButtonField'
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function UserHome() {
    const navigate = useNavigate();

    function handleLogout(){
        try {
            api.post("/logout");
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <>
    <div>UserHome</div>
    <ButtonField id="logout" onClick={handleLogout} data="Logout" />
    </>
  )
}
