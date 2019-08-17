import React from 'react'
import LoadingSvg from '../assets/images/gif/loading-arrow.gif'

const Loading = () => {
  return (
    <div className="loading">
      <h3>loading rooms data...</h3>
      <img src={LoadingSvg} alt="loading..." />
    </div>
  )
}

export default Loading
