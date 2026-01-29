import type { ChangeEventHandler } from 'react'

type InputFieldProps = {
  type: 'text' | 'email' | 'password'
  id: string
  placeholder?: string
  autoComplete: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function InputField({
  type,
  id,
  placeholder,
  autoComplete,
  onChange
}: InputFieldProps) {
  return (
    <div className="w-[90%]">
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={onChange}
      required
      className="
        w-[100%]
        px-[1rem] py-[0.5rem]
        text-[1rem]
        border border-[#e2e2e2]
        rounded-[9px]
        bg-white
        text-[#333]
        placeholder:text-gray-400
        outline-none
        transition-all duration-200
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-500/20
      "
    />
    </div>
  )
}

