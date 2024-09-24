import { useState, createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { version } from '../../package.json'
import { useResetElement } from '@hooks'
import * as apiCalls from '@api/apiCalls'
import {
  Intro,
  LifeEventSection,
  ResultsView,
  VerifySelectionsView,
  Form,
  Alert,
} from '@components'

import './_index.scss'

// data and ui content
import * as en from '@locales/en/en.json'
import * as es from '@locales/es/es.json'

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
  // create our reset element
  useResetElement()

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

  // handle step, stepData, and stepVerification
  const [step, setStep] = useState(hasQueryParams ? null : 0) // steps indicator
  const [stepData, setStepData] = useState(
    () => stepDataArray && stepDataArray[step]
  ) // content
  const [verifyStep, setVerifyStep] = useState(false) // verification view

  // handle new view layout for results
  const [viewResults, setViewResults] = useState(hasQueryParams) // resuts view

  // set up defualts for route
  const basePath = '/benefit-finder/'
  const indexPath = content?.lifeEventForm.id

  useEffect(() => {
    if (
      indexPath &&
      !hasQueryParams &&
      window.location.pathname !== `${basePath}${indexPath}`
    ) {
      window.location = `${basePath}${indexPath}`
    }
  }, [indexPath])

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
    content &&
    stepDataArray && (
      <LanguageContext.Provider value={t}>
        {isDraftMode === true && <Alert>Draft Mode</Alert>}
        <div
          id={content?.lifeEventForm.id}
          className={`benefit-finder ${
            step !== 0 && viewResults !== true ? 'form' : ''
          }`}
          data-testid="app"
          data-version={version}
        >
          <BrowserRouter basename={basePath}>
            <Routes>
              <Route
                path={`/${indexPath}`}
                element={
                  stepDataArray && (
                    <Intro
                      content={content.lifeEventForm}
                      ui={t.intro}
                      setStep={setStep}
                      step={step}
                      stepDataArray={stepDataArray}
                      indexPath={`/${indexPath}/`}
                    />
                  )
                }
              />
              {stepDataArray &&
                stepDataArray.map((item, i) => {
                  const path = item.section.heading
                    .toLowerCase()
                    .replace(/ /g, '-')
                  return (
                    <Route
                      path={`/${indexPath}/${path}`}
                      key={i}
                      element={
                        <div>
                          <Form>
                            <LifeEventSection
                              step={step}
                              setStep={setStep}
                              data={stepDataArray}
                              handleData={setStepDataArray}
                              stepData={stepData}
                              setStepData={setStepData}
                              indexPath={`/${indexPath}/`}
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
                      }
                    />
                  )
                })}
              <Route
                path={`/${indexPath}/verify-selections`}
                element={
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
                    indexPath={indexPath}
                  />
                }
              />
              <Route
                path={`/${indexPath}/results`}
                element={
                  <ResultsView
                    stepDataArray={stepDataArray}
                    relevantBenefits={content?.lifeEventForm?.relevantBenefits}
                    data={benfitsArray}
                    setBenefitsArray={() => setBenefitsArray()}
                    ui={t.resultsView}
                    handleStepBack={() => {
                      setVerifyStep(false)
                      setViewResults(false)
                    }}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </LanguageContext.Provider>
    )
  )
}

// return (
//   content && (
//     <LanguageContext.Provider value={t}>
//       {isDraftMode === true && <Alert>Draft Mode</Alert>}
//       <div
//         id={content?.lifeEventForm.id}
//         className={`benefit-finder ${
//           step !== 0 && viewResults !== true ? 'form' : ''
//         }`}
//         data-testid="app"
//         data-version={version}
//       >
//         {step === 0 ? (
//           <Intro
//             data={content.lifeEventForm}
//             ui={t.intro}
//             setStep={setStep}
//             step={step}
//             stepPath={
//               stepDataArray &&
//               stepDataArray.length > 0 &&
//               stepDataArray[step].section.heading
//                 .toLowerCase()
//                 .replace(/ /g, '-')
//             }
//           />
//         ) : viewResults === true ? (
//           <ResultsView
//             stepDataArray={stepDataArray}
//             relevantBenefits={content?.lifeEventForm?.relevantBenefits}
//             data={benfitsArray}
//             setBenefitsArray={() => setBenefitsArray()}
//             ui={t.resultsView}
//             handleStepBack={() => {
//               setVerifyStep(false)
//               setViewResults(false)
//             }}
//           />
//         ) : verifyStep === false ? (
//           <div>
//             <Form>
//               <LifeEventSection
//                 step={step}
//                 setStep={setStep}
//                 data={stepDataArray}
//                 handleData={setStepDataArray}
//                 stepData={stepData}
//                 setStepData={setStepData}
//                 verifyStep={verifyStep}
//                 setVerifyStep={() => {
//                   setVerifyStep(true)
//                   setModalOpen(false)
//                 }}
//                 setViewResults={() => {
//                   setViewResults(true)
//                   setModalOpen(false)
//                 }}
//                 ui={t}
//                 modalOpen={modalOpen}
//                 setModalOpen={setModalOpen}
//               />
//             </Form>
//           </div>
//         ) : (
//           <VerifySelectionsView
//             handleStepBack={() => {
//               setVerifyStep(false)
//               setViewResults(false)
//             }}
//             handleStepForward={() => {
//               setViewResults(true)
//             }}
//             ui={t}
//             data={stepDataArray}
//             step={step}
//             setStep={setStep}
//           />
//         )}
//       </div>
//     </LanguageContext.Provider>
//   )
// )
// }

export default App
