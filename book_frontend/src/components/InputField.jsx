import React from 'react'

export default function InputField(props) {
  return (
    <input type={props.type} id={props.id} placeholder={props.placeholder} autoComplete={props.autoComplete} onChange={props.onChange}/>
  )
}
