import { useState, createContext, useEffect } from 'react'
import * as apiCalls from '../shared/api/apiCalls'
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
function App({ appContent }) {
  // we create context state to provide translations for our two languages
  const LanguageContext = createContext({ en, es })
  const sharedToken = 'shared'
  const windowQuery = window.location.search
  const hasQueryParams = windowQuery.includes(sharedToken)

  /**
   * lazy load our data state.
   * @function
   * @param {promise} setData - the state of environment
   * @return {state} returns null if not set
   */
  const [content, setContent] = useState(() => {
    apiCalls.GET.LifeEvent().then(response =>
      response.data ? setContent(response.data) : setContent(appContent)
    )
  })

  // set data state
  const [stepDataArray, setStepDataArray] = useState()
  const [benfitsArray, setBenefitsArray] = useState()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    content && setBenefitsArray([...content.benefits])
    content &&
      setStepDataArray([...content.lifeEventForm.sectionsEligibilityCriteria])
  }, [content])

  // state
  const [t] = useState(apiCalls.GET.Language() === 'es' ? es : en) // tranlations
  const [step, setStep] = useState(hasQueryParams ? null : 0) // steps indicator

  const [stepData, setStepData] = useState(
    () => stepDataArray && stepDataArray[step]
  ) // content
  const [verifyStep, setVerifyStep] = useState(false) // verification view
  const [viewResults, setViewResults] = useState(hasQueryParams) // resuts view

  useEffect(() => {
    if (hasQueryParams) {
      stepDataArray &&
        apiCalls.PUT.DataFromParams(
          windowQuery,
          stepDataArray,
          setStepData,
          sharedToken
        )
      stepDataArray && setStep(stepDataArray.length)
    }
  }, [windowQuery, hasQueryParams, stepDataArray])

  return (
    content && (
      <LanguageContext.Provider value={t}>
        <div
          className={`benefit-finder ${
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
                  handleData={setStepDataArray}
                  stepData={stepData}
                  setStepData={setStepData}
                  verifyStep={verifyStep}
                  setVerifyStep={() => {
                    setVerifyStep(true)
                    setModalOpen(false)
                  }}
                  setViewResults={() => {
                    setViewResults(true)
                    setModalOpen(false)
                  }}
                  ui={t}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
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
