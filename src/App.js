import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Profile from './components/Profile'
import InfoCard from './components/InfoCard'
import SavedCharacter from './components/SavedCharacter'
import './App.css'
import activities from './assets/activities.json'


const NUM_OF_ACTIVITIES = 6

function App() {
  
  const [character, setCharacter] = useState()
  const [showInfo, setShowInfo] = useState(false)
  const [savedCharacters, setSavedCharacters] = useState([])
  useEffect(() => {
    const oldSavedCharacters = JSON.parse(localStorage.getItem("characters"))
    if(oldSavedCharacters) {
      setSavedCharacters(oldSavedCharacters)
    }


    fetch('https://randomuser.me/api/')
      .then(res => 
        res.json().then(result => {
          const {id, cell, gender, name, phone, picture, location } = result.results[0]
          const newCharacter = {
            id: id, // { name: nameValue, value: idValue}
            cell: cell,
            gender: gender,
            name: name, // title, first, last
            phone: phone,
            picture: picture, // large, medium, thumbnail
            location: location,
            activities: generateActivities()
          }
          setCharacter(newCharacter)
        })
      )
  }, [])

  function generateActivities() {
    const characterActivities = []
    let randomIndexes = []
    for(let i = 0; i < NUM_OF_ACTIVITIES; i++) {
      let randomIndex = Math.floor(Math.random() * activities.length)
      while(randomIndexes.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * activities.length)
      }
      characterActivities.push(activities[randomIndex])
    }

    return {
      hobbies: characterActivities.slice(0, NUM_OF_ACTIVITIES / 2),
      dislikes: characterActivities.slice((NUM_OF_ACTIVITIES / 2), NUM_OF_ACTIVITIES)
    }
  }


  function toggleInfoCard() {
    setShowInfo(oldShowInfo => !oldShowInfo)
  }

  function rerollCharacter() {
    fetch('https://randomuser.me/api/')
      .then(res => 
        res.json().then(result => {
          const {id, cell, gender, name, phone, picture, location } = result.results[0]
          const newCharacter = {
            id: id, // { name: nameValue, value: idValue}
            cell: cell,
            gender: gender,
            name: name, // title, first, last
            phone: phone,
            picture: picture, // large, medium, thumbnail
            location: location,
            activities: generateActivities()
          }
          setCharacter(newCharacter)
        })
      )
  }

  function saveCharacter() {
    let oldSavedCharacters = JSON.parse(localStorage.getItem("characters")) // store value as an array
    if(oldSavedCharacters && oldSavedCharacters.find(oldCharacter => oldCharacter.id.value === character.id.value)) {
      return 
    }
    oldSavedCharacters = [...savedCharacters, character]
    setSavedCharacters(oldSavedCharacters)
    localStorage.setItem("characters", JSON.stringify(oldSavedCharacters))
  }

  function deleteCharacter(id) {
    const newSavedCharacters = savedCharacters.filter(character => character.id.value !== id)
    localStorage.setItem('characters', JSON.stringify(newSavedCharacters))
    setSavedCharacters(newSavedCharacters)
  }

  return (
    <div className="App">
      {showInfo && <InfoCard />}
      <Header showInfoCard={toggleInfoCard}/>
      {character && <Profile character={character}/>}
      <div className="button-container">
        <button onClick={rerollCharacter}>Reroll</button>
        <button onClick={saveCharacter}>Save</button>
      </div> 
      <h2 className="saved-characters-header">Saved Characters</h2>
      <div className="saved-characters-container">
        {savedCharacters.length > 0 ? savedCharacters.map(
          savedCharacter => <SavedCharacter key={savedCharacter.id.value} character={savedCharacter} deleteCharacter={() => deleteCharacter(savedCharacter.id.value)}/>)
          : <p>You don't have any saved characters :(</p>
        }
      </div>
    </div>
  );
}

export default App;
