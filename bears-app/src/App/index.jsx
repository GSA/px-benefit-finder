import { useState, createContext } from 'react'
import {
  Intro,
  LifeEventSection,
  ResultsView,
  VerifySelectionsView,
  Form,
} from '../shared/components'

// data and ui content
import * as en from '../shared/locales/en/en.json'
import * as es from '../shared/locales/es/es.json'
import content from '../shared/api/mock-data/content-data'

/**
 * a functional component that renders our application.
 * @component
 */
function App() {
  // we create context state to provide translations for our two languages
  const LanguageContext = createContext({ en, es })

  // handlers
  /**
   * a function that determines the context of ui translations
   * based on a string match in the pathname of the window object
   * @function
   */
  const handleLanguage = () => {
    const string = /^\/es/
    return string.test(window.location.pathname) ? es : en
  }

  // destructure data
  const { lifeEventForm } = JSON.parse(content)
  const stepDataArray = lifeEventForm.sectionsEligibilityCriteria

  // state
  const [t] = useState(handleLanguage) // tranlations
  const [step, setStep] = useState(0) // steps indicator
  const [stepData, setStepData] = useState(stepDataArray[step]) // content
  const [verifyStep, setVerifyStep] = useState(false) // verification view
  const [viewResults, setViewResults] = useState(false) // resuts view

  return (
    <LanguageContext.Provider value={t}>
      {/* {console.log(t)} */}
      <div className="bears-app">
        {step === 0 ? (
          <Intro
            data={lifeEventForm}
            ui={t.intro}
            setStep={setStep}
            step={step}
          />
        ) : viewResults === true ? (
          <ResultsView
            ui={t.resultsView}
            handleStepBack={() => {
              setVerifyStep(false)
              setViewResults(false)
            }}
          />
        ) : verifyStep === false ? (
          <Form>
            <LifeEventSection
              step={step}
              setStep={setStep}
              data={stepDataArray}
              stepData={stepData}
              setStepData={setStepData}
              verifyStep={verifyStep}
              setVerifyStep={() => setVerifyStep(true)}
              setViewResults={() => setViewResults(true)}
              ui={t}
            />
          </Form>
        ) : (
          <VerifySelectionsView
            handleStepBack={() => {
              setVerifyStep(false)
              setViewResults(false)
            }}
            handleStepForward={() => {
              setViewResults(true)
            }}
            ui={t.verifySelectionsView}
          />
        )}
      </div>
    </LanguageContext.Provider>
  )
}

export default App
