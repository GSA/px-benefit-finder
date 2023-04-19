import { useState } from 'react'
import { ComponentSandbox } from '../index';

function App() {

 const [showGuide, setShowGuide] = useState(process.env.NODE_ENV !== "production" ? true : null)

 const handleShowGuideButton = (showGuide) => {
  return (
    showGuide !== null &&
    <button onClick={() => setShowGuide(!showGuide)}>Component Sandbox</button>
  )
 }

 const handleShowApp = (showGuide) => {
  return (
    showGuide ? <ComponentSandbox /> : <h1>App</h1>
  )
 }

  return (
    <div className="App">
      { handleShowGuideButton(showGuide) }
      { handleShowApp(showGuide) }
    </div>
  );
}

export default App;
