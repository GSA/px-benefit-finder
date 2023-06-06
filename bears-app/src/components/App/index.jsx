import { useEffect, useState } from 'react'
import { ComponentSandbox } from '../index'
import { Button } from '../shared'

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
   * GET and set our data.
   * @function
   * @param {json} setData - the state of environment
   * @return {state} returns null if not set
   */
  const [data, setData] = useState(null)

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

  /**
   * an async fetch to get life-event data.
   * @function
   * @param {string} lifeEvent - The inherited class from
   * @return {JSON} returns JSON data
   */
  async function GETLifeEvent(lifeEvent) {
    // get life-event from location
    if (lifeEvent === undefined) {
      const location = window.location.pathname
      lifeEvent = location.substring(location.lastIndexOf('/') + 1)
    }
    const response = await fetch(`/bears/api/life-event/${lifeEvent}`)
    const jsonData = await response.json()
    return jsonData
  }

  useEffect(() => {
    GETLifeEvent().then(response => setData(response))
    return () => {}
  }, [data])

  return (
    <div className="bears-app">
      {handleShowGuideButton(showGuide)}
      {handleShowApp(showGuide)}
      {data?.data.map(d => JSON.stringify(d))}
    </div>
  )
}

export default App
