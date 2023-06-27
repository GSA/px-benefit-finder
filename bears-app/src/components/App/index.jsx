import { useState } from 'react'
import * as apiCalls from '../shared/api/api-calls'

/**
 * a functional component that renders our application.
 * @component
 */
function App() {
  // state

  /**
   * lazy load our data state.
   * @function
   * @param {promise} setData - the state of environment
   * @return {state} returns null if not set
   */
  const [data, setData] = useState(() => {
    apiCalls.GETLifeEvent().then(response => setData(response))
  })

  // handlers

  /**
   * handle our data maping.
   * @function
   * @param {object} data - the json object returned from data load
   * @return {string} returns strigified data
   */
  const handleData = data => {
    if (data === undefined) {
      return 'loading...'
    }
    // either return the mapped data object or the error
    return data?.data ? data.data.map(d => JSON.stringify(d)) : data
  }

  return (
    <div className="bears-app">
      <h1>BEARS Hello World!</h1>
      {handleData(data)}
    </div>
  )
}

export default App
