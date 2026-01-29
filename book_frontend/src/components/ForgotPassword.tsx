import InputField from "./InputField"
import ButtonField from "./ButtonField"
import api from "../api/axios"
import { useState } from "react"
import type { FormEvent, ChangeEvent } from 'react'
import type { ResetFormData } from "../interfaces/ResetPass.interface"

export default function ForgotPassword() {
    const [resetFormData, setResetFormData] = useState<ResetFormData>({
        email: "",
        password: "",
        confirmPassword: ""
      })
      const [error, setError] = useState<string | null>(null)
      const validate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        try{
        if (resetFormData.password !== resetFormData.confirmPassword) {
            setError('Password and confirm password must be the same!')
            return
        }

        if (resetFormData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        }catch(err){

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
              setResetFormData({...resetFormData, email: e.target.value})
              setError(null)
            }}
          />

          <InputField
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setResetFormData({...resetFormData, password: e.target.value})
              setError(null)
            }}
          />

          <InputField
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setResetFormData({...resetFormData, confirmPassword: e.target.value})
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
      </div>
    </div>
  )
}
