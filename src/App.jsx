import React, { useState } from "react"
import axios from "axios"
import StoryForm from "./components/StoryForm/StoryForm"
import StoryDisplay from "./components/StoryDisplay/StoryDisplay"
import "./assets/fonts/fonts.css"
import "./App.css"

function App() {
  const [storyInputs, setStoryInputs] = useState(null)
  const [story, setStory] = useState("")
  const [loading, setLoading] = useState(false) 

  const API_KEY = import.meta.env.VITE_API_KEY
  console.log(API_KEY)

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
              content: `Escribe una historia que empiece con la palabra Érase una vez de ${inputs.storyLength} palabras sobre los siguientes personajes: ${inputs.characterNames.join(", ")}. El tipo de historia es ${inputs.storyType}.`
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
