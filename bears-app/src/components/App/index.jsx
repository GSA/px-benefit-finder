import { useState } from 'react'
import { ComponentSandbox } from '../index'
import { Button } from '../shared'
import * as apiCalls from '../shared/api/api-calls'

/**
 * a functional component that renders our application.
 * @component
 */
function App() {
  // state
  /**
   * a boolean function to manage the guide visibility state.
   * @function
   * @param {boolean} showGuide - the state of environment
   * @return {state} returns null if not production
   */
  const [showGuide, setShowGuide] = useState(
    process.env.NODE_ENV !== 'production' ? true : null
  )

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
   * a boolean function to manage the visibility of the guide button.
   * @function
   * @param {boolean} showGuide - The inherited class from
   * @return {component} returns a component if not null
   */
  const handleShowGuideButton = showGuide => {
    return (
      showGuide !== null && (
        <Button
          className="usa-button--outline"
          onClick={() => setShowGuide(!showGuide)}
        >
          Component Sandbox
        </Button>
      )
    )
  }

  /**
   * a boolean function to manage the visibility of the ComponentSandbox.
   * @function
   * @param {boolean} showGuide - The inherited class from
   * @return {component} returns a component if not null
   */
  const handleShowApp = showGuide => {
    return showGuide ? <ComponentSandbox /> : <h1>BEARS Hello World!</h1>
  }

  const handleData = data => {
    if (data === undefined) {
      return 'loading...'
    }
    // either return the mapped data object or the error
    return data?.data ? data.data.map(d => JSON.stringify(d)) : `${data}`
  }

  return (
    <div className="bears-app">
      {handleShowGuideButton(showGuide)}
      {handleShowApp(showGuide)}
      {handleData(data)}
    </div>
  )
}

export default App
