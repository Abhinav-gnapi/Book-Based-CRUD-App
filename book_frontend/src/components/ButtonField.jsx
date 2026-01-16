import React from 'react'

export default function ButtonField(props) {
  return (
    <button id={props.id} onClick={props.onClick}>{props.data}</button>
  )
}
