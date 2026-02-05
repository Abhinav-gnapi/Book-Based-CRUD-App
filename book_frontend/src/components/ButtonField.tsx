import type { FormEventHandler, MouseEventHandler } from 'react'

type ButtonFieldProps = {
  id?: string
  data: string
  type: "button" | "submit" | "reset"
  onClick?: FormEventHandler<HTMLButtonElement>
  className?: string
}

export default function ButtonField({
  id,
  data,
  onClick,
  type,
  className
}: ButtonFieldProps) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={className}
    >
      {data}
    </button>
  )
}

