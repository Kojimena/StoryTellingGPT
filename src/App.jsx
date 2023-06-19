import React, { useState } from "react"
import axios from "axios"
import StoryForm from "./components/StoryForm/StoryForm"
import StoryDisplay from "./components/StoryDisplay/StoryDisplay"

function App() {
  const [storyInputs, setStoryInputs] = useState(null)
  const [story, setStory] = useState("")

  const generateStory = async (inputs) => {
    console.log("Generando")
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: `escribe una historia sobre un personaje llamado ${inputs.characterName}, de tipo ${inputs.storyType}.`,
          max_tokens: 100,
          temperature: 0.2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer ${REACT_APP_OPENAI_API_KEY}",
          },
        }
      )
      console.log(response.data)
      setStory(response.data.choices[0].text)
    } catch (error) {
      console.error("Hubo un error al generar la historia:", error)
    }
  }
  

  const handleStoryInputs = (inputs) => {
    setStoryInputs(inputs)
    generateStory(inputs)
  }

  return (
    <div className="App">
      <StoryForm setStoryInputs={handleStoryInputs} />
      <StoryDisplay story={story} />
    </div>
  )
}

export default App
