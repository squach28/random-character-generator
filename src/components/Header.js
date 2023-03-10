import React from 'react'
import './Header.css'
import { AiFillQuestionCircle } from 'react-icons/ai'

function Header(props) {
  return (
    <header>
        <h1>Random Character Generator</h1>
        <AiFillQuestionCircle className="icon" onClick={props.showInfoCard}/>
    </header>
  )
}

export default Header