import React, { useState } from "react"
import axios from "axios"
import StoryForm from "./components/StoryForm/StoryForm"
import StoryDisplay from "./components/StoryDisplay/StoryDisplay"
import "/i18n"
import { useTranslation } from "react-i18next"
import "./assets/fonts/fonts.css"
import "./App.css"

function App() {
  const [storyInputs, setStoryInputs] = useState(null)
  const [story, setStory] = useState("")
  const [loading, setLoading] = useState(false) 
  const { t, i18n } = useTranslation()  


  const API_KEY = import.meta.env.VITE_API_KEY

  const generateStory = async (inputs) => {
    setLoading(true) 
    console.log("Generando")
    console.log(inputs)
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:`${t("writeStory")} ${inputs.storyLength} ${t("wordsAboutCharacters")} ${inputs.characterNames.join(", ")}. ${t("storyTypeIs")} ${inputs.storyType}. ${t("useFormat")}`
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        }
      )
      console.log(response.data)
      setStory(response.data.choices[0].message.content)
    } catch (error) {
      console.error("Hubo un error al generar la historia:", error)
    }finally {
      setLoading(false) 
    }
  }

  const handleStoryInputs = (inputs) => {
    setStoryInputs(inputs)
    generateStory(inputs)
  }

  return (
    <div className="App">
      <div className="btnlanguage">
        <button className="btnen" onClick={() => i18n.changeLanguage("en")}><img src="/images/en.svg" alt="English" className="en" /></button>
        <button className="btnes" onClick={() => i18n.changeLanguage("es")}> <img src="/images/es.svg" alt="Spanish" className="es" /></button>
      </div>
      <div className="books-container">
        <img src="/images/books.svg" alt="Story AI" className="books" />
      </div>
      <StoryForm setStoryInputs={handleStoryInputs} />
      {
        loading ? 
        <div className="loader">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div> 
        </div>
        :
        storyInputs && storyInputs.storyType && storyInputs.numCharacters && storyInputs.storyLength && storyInputs.characterNames[0] !== "" && storyInputs.characterNames.length === parseInt(storyInputs.numCharacters) ?
        <StoryDisplay story={story} />
        :
        null
      }
    </div>
  )
}

export default App
