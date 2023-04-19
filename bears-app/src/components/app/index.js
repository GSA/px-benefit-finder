import { useState } from 'react'
import { ComponentGuide } from '../index';

function App() {

 const [showGuide, setShowGuide] = useState(true)

 const handleShowGuideButton = (showGuide) => {
  return (
    process.env.NODE_ENV !== "production" &&
    <button onClick={() => setShowGuide(!showGuide)}>Component Guide</button>
  )
 }

 const handleShowApp = (showGuide) => {
  return (
    showGuide === true ? <ComponentGuide /> : <h1>App</h1>
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
