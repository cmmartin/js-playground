import React from 'react'

export default function ({ children }) {

  const style = {
    display: 'block',
    whiteSpace: 'pre',
    border: '2px solid #c77',
    padding: '0 1em 0 1em',
    margin: '1em',
    backgroundColor: '#fdd',
    color: 'black',
    padding: 20,
    fontSize: 14,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    
  }

  return (
    <parsererror style={style}>
      { children }
    </parsererror>
  )
}