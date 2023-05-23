import { useState } from 'react'
import { ComponentSandbox } from '../index'
import { Button } from '../shared'

/**
 * a functional component that renders our application.
 * @component
 */
function App() {
  /**
   * a boolean function to manage the guide state.
   * @function
   * @param {boolean} showGuide - the state of environment
   * @return {state} returns null if not production
   */
  const [showGuide, setShowGuide] = useState(
    process.env.NODE_ENV !== 'production' ? true : null
  )

  /**
   * a boolean function to manage the guide state.
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
   * a boolean function to manage the guide state.
   * @function
   * @param {boolean} showGuide - The inherited class from
   * @return {component} returns a component if not null
   */
  const handleShowApp = showGuide => {
    return showGuide ? <ComponentSandbox /> : <h1>App</h1>
  }

  return (
    <div className="App">
      {handleShowGuideButton(showGuide)}
      {handleShowApp(showGuide)}
    </div>
  )
}

export default App
