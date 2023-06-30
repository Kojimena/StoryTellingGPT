import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "./StoryForm.css"

const StoryForm = ({ setStoryInputs }) => {
  const [storyType, setStoryType] = useState("")
  const [numCharacters, setNumCharacters] = useState("1")
  const [storyLength, setStoryLength] = useState("")
  const [characterNames, setCharacterNames] = useState([""]) // Almacenar los nombres de los personajes en un array

  const handleCharacterNameChange = (index, event) => {
    const newCharacterNames = [...characterNames]
    newCharacterNames[index] = event.target.value
    setCharacterNames(newCharacterNames)
  }

  useEffect(() => {
    if (numCharacters === "" || isNaN(numCharacters)) {
      return
    }else if (parseInt(numCharacters) < 0) {
      setNumCharacters("0")
      return
    }
    const newCharacterNames = new Array(parseInt(numCharacters)).fill("")
    setCharacterNames(newCharacterNames)
    console.log("Cambiando el número de personajes")
  }, [numCharacters])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (storyType === "" || numCharacters === "" || storyLength === "" || characterNames.includes("")) {
      alert("Por favor, completa todos los campos.")
      return
    }
    setStoryInputs({ characterNames, storyType, numCharacters, storyLength })
  }

  return (
    <form className="story-form" onSubmit={handleSubmit}>
      <h2 className="story-form-title">STORY AI</h2>
      <h4>Número de personajes</h4>
      <input
        type="number"
        placeholder="Número de personajes"
        value={numCharacters}
        onChange={(e) => setNumCharacters(e.target.value)}
      />
      <h4>Nombres de los personajes</h4>
      {characterNames.map((name, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Nombre del personaje ${index + 1}`}
          value={name}
          onChange={(e) => handleCharacterNameChange(index, e)}
        />
      ))}
      <h4>Tipo de cuento</h4>
      <select value={storyType} onChange={(e) => setStoryType(e.target.value)}>
        <option value="">Tipo de cuento</option>
        <option value="aventura">Aventura</option>
        <option value="fantasia">Fantasía</option>
        <option value="terror">Terror</option>
        <option value="ciencia ficcion">Ciencia Ficción</option>
        <option value="romance">Romance</option>
      </select>
      <h4>Longitud de la historia</h4>
      <input
        type="number"
        placeholder="Longitud de la historia (en palabras)"
        value={storyLength}
        onChange={(e) => setStoryLength(e.target.value)}
      />
      <button type="submit">Generar Cuento</button>
    </form>
  )
}

StoryForm.propTypes = {
    setStoryInputs: PropTypes.func.isRequired,
}

export default StoryForm
