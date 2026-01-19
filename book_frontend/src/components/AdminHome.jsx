import React from 'react'
import ButtonField from './ButtonField'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios';

export default function AdminHome() {
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
    <div>AdminHome</div>
    <ButtonField id="logout" onClick={handleLogout} data="Logout" />
    </>
  )
}
