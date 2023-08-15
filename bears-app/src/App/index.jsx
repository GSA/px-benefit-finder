import { useState, createContext } from 'react'
import {
  Intro,
  LifeEventSection,
  ResultsView,
  VerifySelectionsView,
  Form,
} from '../shared/components'

import './_index.scss'

// data and ui content
import * as en from '../shared/locales/en/en.json'
import * as es from '../shared/locales/es/es.json'
import content from '../shared/api/mock-data/content-data'
// import content from '../shared/api/mock-data/dolo-data.js'

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
  const { lifeEventForm, benefits } = JSON.parse(content)

  // set data state
  const [stepDataArray, setStepDataArray] = useState([
    ...lifeEventForm.sectionsEligibilityCriteria,
  ])
  const [benfitsArray, setBenefitsArray] = useState([...benefits])

  // state
  const [t] = useState(handleLanguage) // tranlations
  const [step, setStep] = useState(0) // steps indicator
  const [stepData, setStepData] = useState(stepDataArray[step]) // content
  const [verifyStep, setVerifyStep] = useState(false) // verification view
  const [viewResults, setViewResults] = useState(false) // resuts view

  return (
    <LanguageContext.Provider value={t}>
      {/* {console.log(t)} */}
      <div
        className={`bears-app ${
          step !== 0 && viewResults !== true ? 'form' : ''
        }`}
      >
        {step === 0 ? (
          <Intro
            data={lifeEventForm}
            ui={t.intro}
            setStep={setStep}
            step={step}
          />
        ) : viewResults === true ? (
          <ResultsView
            stepDataArray={stepDataArray}
            data={benfitsArray}
            setBenefitsArray={() => setBenefitsArray()}
            ui={t.resultsView}
            handleStepBack={() => {
              setVerifyStep(false)
              setViewResults(false)
            }}
          />
        ) : verifyStep === false ? (
          <div>
            <Form>
              <LifeEventSection
                step={step}
                setStep={setStep}
                data={stepDataArray}
                handleData={() => setStepDataArray()}
                stepData={stepData}
                setStepData={setStepData}
                verifyStep={verifyStep}
                setVerifyStep={() => setVerifyStep(true)}
                setViewResults={() => setViewResults(true)}
                ui={t}
              />
            </Form>
          </div>
        ) : (
          <VerifySelectionsView
            handleStepBack={() => {
              setVerifyStep(false)
              setViewResults(false)
            }}
            handleStepForward={() => {
              setViewResults(true)
            }}
            ui={t}
            data={stepDataArray}
            step={step}
            setStep={setStep}
          />
        )}
      </div>
    </LanguageContext.Provider>
  )
}

export default App
