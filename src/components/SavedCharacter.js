import React from 'react'
import Profile from './Profile'
import './SavedCharacter.css'

function SavedCharacters(props) {
  console.log(props.character.id.value)
  return (
    <div className="saved-character-container">
      <button className="delete" onClick={props.deleteCharacter}>X</button>
      <Profile character={props.character}/>
    </div>
  )
}

export default SavedCharacters