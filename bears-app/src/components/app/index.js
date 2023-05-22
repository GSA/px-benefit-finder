import { useState } from 'react'
import { ComponentSandbox, Button } from '../index'

function App() {
  const [showGuide, setShowGuide] = useState(
    process.env.NODE_ENV !== 'production" ? true : null
  )

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
