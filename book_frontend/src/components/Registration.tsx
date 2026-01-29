import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

import InputField from './InputField.js'
import ButtonField from './ButtonField.js'
import type { RegistrationFormData } from '../interfaces/Registraction.interface.js'

export default function Registration() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const validate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    try{
      if (formData.password !== formData.confirmPassword) {
        setError('Password and confirm password must be the same!')
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
      
      const res = await api.post('/register', { email: formData.email, username: formData.username, password: formData.password })
      if(res.data.success){
        navigate('/login')
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
    <h3 className="text-center mb-8 p-[8px] text-[1.6rem] font-semibold text-[#2d2d2d]">
      Create Account
    </h3>

    <form className="flex flex-col items-center gap-5 p-[9px]" onSubmit={validate}>
          <InputField
            type="email"
            id="email"
            placeholder="Email address"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData({...formData, email: e.target.value})
              setError(null)
            }}
          />

          <InputField
            type="text"
            id="unsername"
            placeholder="Username"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData({...formData, username: e.target.value})
              setError(null)
            }}
          />

          <InputField
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData({...formData, password: e.target.value})
              setError(null)
            }}
          />

          <InputField
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData({...formData, confirmPassword: e.target.value})
              setError(null)
            }}
          />

          {error && (
            <div className=" mb-[-0.6rem] px-[1rem] py-[.2rem] text-sm text-red-700 items-center bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          
          <ButtonField id="submit" data="Register"
            className='w-[90%]
                  p-[7px]
                  rounded-[10px]
                  font-semibold
                  text-[#fff]
                  bg-gradient-to-br from-indigo-500 to-purple-600
                  transition-all duration-150
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_20px_rgba(102,126,234,0.35)]
                  disabled:opacity-60
                  disabled:cursor-not-allowed'
          />
        </form>

        <p className="mt-5 text-center text-sm text-gray-600 mb-[8px]">
      Already have an account?{' '}
      <Link
        to="/login"
        className="text-[#667eea] font-semibold hover:underline"
      >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}