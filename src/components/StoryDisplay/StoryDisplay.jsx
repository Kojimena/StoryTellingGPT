import React from "react"
import PropTypes from "prop-types"
import "./StoryDisplay.css"

const StoryDisplay = ({ story }) => {
  const formattedStory = story.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ))

  return (
    <div className="story-display">
      <p>{formattedStory}</p>
    </div>
  )
}

StoryDisplay.propTypes = {
    story: PropTypes.string.isRequired,
}


export default StoryDisplay
