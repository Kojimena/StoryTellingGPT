import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import "./StoryForm.css"

const StoryForm = ({ setStoryInputs }) => {
  const [storyType, setStoryType] = useState("")
  const [numCharacters, setNumCharacters] = useState("1")
  const [storyLength, setStoryLength] = useState("")
  const [characterNames, setCharacterNames] = useState([""]) // Almacenar los nombres de los personajes en un array
  const { t } = useTranslation()

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
      alert(t("completeFields"))
      return
    }
    setStoryInputs({ characterNames, storyType, numCharacters, storyLength })
  }

  return (
    <form className="story-form" onSubmit={handleSubmit}>
      <h2 className="story-form-title">{t("storyAI")}</h2>
      <h4>{t("numCharacters")}</h4>
      <input
        type="number"
        placeholder={t("numCharactersPlaceholder")}
        value={numCharacters}
        onChange={(e) => setNumCharacters(e.target.value)}
      />
      <h4>{t("charNames")}</h4>
      {characterNames.map((name, index) => (
        <input
          key={index}
          type="text"
          placeholder={`${t("charName")} ${index + 1}`}
          value={name}
          onChange={(e) => handleCharacterNameChange(index, e)}
        />
      ))}
      <h4>{t("storyType")}</h4>
      <select value={storyType} onChange={(e) => setStoryType(e.target.value)}>
        <option value="">{t("storyTypePlaceholder")}</option>
        <option value="aventura">{t("adventure")}</option>
        <option value="fantasia">{t("fantasy")}</option>
        <option value="terror">{t("horror")}</option>
        <option value="ciencia ficcion">{t("scifi")}</option>
        <option value="romance">{t("romance")}</option>
      </select>
      <h4>{t("storyLength")}</h4>
      <input
        type="number"
        placeholder={t("storyLengthPlaceholder")}
        value={storyLength}
        onChange={(e) => setStoryLength(e.target.value)}
      />
      <button type="submit">{t("generateStory")}</button>
    </form>
  )
}

StoryForm.propTypes = {
    setStoryInputs: PropTypes.func.isRequired,
}

export default StoryForm
