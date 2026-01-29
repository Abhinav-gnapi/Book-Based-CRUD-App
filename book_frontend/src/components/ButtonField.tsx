import type { FormEventHandler, MouseEventHandler } from 'react'

type ButtonFieldProps = {
  id?: string
  data: string
  onClick?: FormEventHandler<HTMLButtonElement>
  className?: string
}

export default function ButtonField({
  id,
  data,
  onClick,
  className
}: ButtonFieldProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={className}
    >
      {data}
    </button>
  )
}

