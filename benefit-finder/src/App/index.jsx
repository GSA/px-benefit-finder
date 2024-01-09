import { useState, createContext, useEffect, useRef } from 'react'
// import { useHandleUnload } from '../shared/hooks/useHandleUnload'
import * as apiCalls from '../shared/api/apiCalls'
import {
  Intro,
  LifeEventSection,
  ResultsView,
  VerifySelectionsView,
  Form,
  Alert,
} from '../shared/components'

import './_index.scss'

// data and ui content
import * as en from '../shared/locales/en/en.json'
import * as es from '../shared/locales/es/es.json'

/**
 * a functional component that renders our application.
 * @component
 */
function App({ testAppContent, testQuery }) {
  // we create context state to provide translations for our two languages
  const LanguageContext = createContext({ en, es })
  const sharedToken = 'shared'
  const draftToken = 'draft'
  const windowQuery = testQuery || window.location.search
  const hasQueryParams = windowQuery.includes(sharedToken)
  const isDraftMode = windowQuery.includes(draftToken)
  const tabbableElements = document.getElementsByClassName('usa-skipnav')
  const skipNav = useRef(tabbableElements[0])

  /**
   * lazy load our data state.
   * @function
   * @param {promise} setData - the state of environment
   * @return {state} returns null if not set
   */
  const [content, setContent] = useState(() => {
    if (process.env.NODE_ENV === 'production') {
      apiCalls.GET.LifeEvent().then(
        response =>
          response?.status === 200
            ? setContent(response.data)
            : setContent(testAppContent) // fallback for storybook
      )
    }
    if (
      process.env.NODE_ENV === 'development' &&
      testAppContent === undefined
    ) {
      apiCalls.GET.LifeEvent().then(
        response => response?.status === 200 && setContent(response.data)
      )
    }
    // default to test state so we don't collide with component mounting
    return testAppContent
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
        {isDraftMode === true && <Alert>Draft Mode</Alert>}
        <div
          className={`benefit-finder ${
            step !== 0 && viewResults !== true ? 'form' : ''
          }`}
          data-testid="app"
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
              relevantBenefits={content?.lifeEventForm?.relevantBenefits}
              data={benfitsArray}
              setBenefitsArray={() => setBenefitsArray()}
              ui={t.resultsView}
              handleStepBack={() => {
                setVerifyStep(false)
                setViewResults(false)
                skipNav && skipNav.current.focus()
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
                    skipNav && skipNav.current.focus()
                  }}
                  setViewResults={() => {
                    setViewResults(true)
                    setModalOpen(false)
                    skipNav && skipNav.current.focus()
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
                skipNav && skipNav.current.focus()
              }}
              handleStepForward={() => {
                setViewResults(true)
                skipNav && skipNav.current.focus()
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
