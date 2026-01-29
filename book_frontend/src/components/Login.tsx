import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import InputField from './InputField'
import ButtonField from './ButtonField'

import api from '../api/axios'
import type { LoginFormData } from '../interfaces/Login.interface'

export default function Login() {
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null)


  const navigate = useNavigate()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await api.post('/login', { email: loginData.email, password: loginData.password })
      console.log(res.status)
      const user = res.data.user

      if (user.success) {
        if (user.role === 'admin') {
          navigate('/adminHome')
        } else {
          navigate('/userHome')
        }
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] via-[#6f6bdc] to-[#764ba2] p-8">
    <div className="
      w-full max-w-[380px]
      bg-white
      rounded-2xl
      p-[10px]
      shadow-[0_25px_50px_rgba(0,0,0,0.18)]
      transition-all
    ">
    <h3 className="text-center mb-8 p-[8px] text-[1.6rem] font-extrabold text-[#2d2d2d]">
      Welcome Back
    </h3>
    
        <form className="flex flex-col items-center gap-5 p-[9px]" onSubmit={handleLogin}>
                <InputField 
                  type="email"
                  id="email"
                  placeholder="Enter email" 
                  autoComplete="off" 
                  onChange={(e) => {setLoginData({...loginData, email:e.target.value}), setError(null)}} 
                />

                <InputField 
                  type="password" 
                  id="password" 
                  placeholder="Enter password" 
                  autoComplete='off' 
                  onChange={(e) => setLoginData({...loginData, password:e.target.value})} 
                />

                <Link to="/forgot-password" className="text-[#667eea] hover:underline text-[0.85rem] self-end mt-[-1rem] mb-[-0.6rem] pr-[1.2rem]">
                  Forgot password?
                </Link>

                {error && (
                  <div className=" mb-[-0.6rem] px-[1rem] py-[.2rem] text-sm text-red-700 items-center bg-red-100 rounded-lg">
                    {error}
                  </div>
                )}

                <ButtonField id="login" data="Login" 
                  className="w-[90%]
                  p-[7px]
                  rounded-[10px]
                  font-semibold
                  text-[#fff]
                  bg-gradient-to-br from-indigo-500 to-purple-600
                  transition-all duration-150
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_20px_rgba(102,126,234,0.35)]
                  disabled:opacity-60
                  disabled:cursor-not-allowed" 
                />
        </form>

        <p className="mt-5 text-center text-sm text-gray-600 mb-[8px]">
      Don't have an account?{" "}
      <Link
        to="/register" className="text-[#667eea] font-semibold hover:underline">
        Register
      </Link>
    </p>
      </div>
    </div>
  );
}
