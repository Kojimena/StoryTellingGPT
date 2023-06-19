import React from "react"
import PropTypes from "prop-types"
import "./StoryDisplay.css"

const StoryDisplay = ({ story }) => {
  return (
    <div className="story-display">
      <p>{story}</p>
    </div>
  )
}

StoryDisplay.propTypes = {
    story: PropTypes.string.isRequired,
}


export default StoryDisplay
