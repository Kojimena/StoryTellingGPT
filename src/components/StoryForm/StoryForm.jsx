import React, { useState } from "react"
import PropTypes from "prop-types"
import "./StoryForm.css"

const StoryForm = ({ setStoryInputs }) => {
  const [characterName, setCharacterName] = useState("")
  const [storyType, setStoryType] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setStoryInputs({ characterName, storyType })
  }

  return (
    <form className="story-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del personaje"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />
      <select value={storyType} onChange={(e) => setStoryType(e.target.value)}>
        <option value="">Selecciona el tipo de cuento</option>
        <option value="aventura">Aventura</option>
        <option value="fantasia">Fantasía</option>
        <option value="terror">Terror</option>
        <option value="ciencia ficcion">Ciencia Ficción</option>
        <option value="romance">Romance</option>
      </select>
      <button type="submit">Generar Cuento</button>
    </form>
  )
}

StoryForm.propTypes = {
    setStoryInputs: PropTypes.func.isRequired,
}


export default StoryForm
