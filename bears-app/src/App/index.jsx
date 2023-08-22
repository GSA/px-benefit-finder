import { useState, createContext, useEffect } from 'react'
import * as apiCalls from '../shared/api/api-calls'
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
// import content from '../shared/api/mock-data/current.js'

/**
 * a functional component that renders our application.
 * @component
 */
function App() {
  // we create context state to provide translations for our two languages
  const LanguageContext = createContext({ en, es })

  /**
   * lazy load our data state.
   * @function
   * @param {promise} setData - the state of environment
   * @return {state} returns null if not set
   */
  const [content, setContent] = useState(() => {
    apiCalls.GETLifeEvent().then(response => setContent(response.data))
  })

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

  // set data state
  const [stepDataArray, setStepDataArray] = useState()
  const [benfitsArray, setBenefitsArray] = useState()

  useEffect(() => {
    content && setBenefitsArray([...content.benefits])
    content &&
      setStepDataArray([...content.lifeEventForm.sectionsEligibilityCriteria])
  }, [content])

  // state
  const [t] = useState(handleLanguage) // tranlations
  const [step, setStep] = useState(0) // steps indicator
  const [stepData, setStepData] = useState(
    () => stepDataArray && stepDataArray[step]
  ) // content
  const [verifyStep, setVerifyStep] = useState(false) // verification view
  const [viewResults, setViewResults] = useState(false) // resuts view

  return (
    content && (
      <LanguageContext.Provider value={t}>
        <div
          className={`bears-app ${
            step !== 0 && viewResults !== true ? 'form' : ''
          }`}
        >
          {step === 0 ? (
            <Intro
              data={content.lifeEventForm}
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
  )
}

export default App
