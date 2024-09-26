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

// establish context
export const RouteContext = createContext({})
export const LanguageContext = createContext({ en, es })

/**
 * a functional component that renders our application.
 * @component
 */
function App({ testAppContent, testQuery }) {
  // we create context state to provide translations for our two languages
  const sharedToken = 'shared'
  const draftToken = 'draft'
  const windowQuery = testQuery || window.location.search
  const hasQueryParams = windowQuery.includes(sharedToken)
  const isDraftMode = windowQuery.includes(draftToken)
  // create our reset element
  useResetElement()

  /**
   * load our data state.
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
  // const [modalOpen, setModalOpen] = useState(false)

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

  // // handle new view layout for results
  const [viewResults, setViewResults] = useState(hasQueryParams) // resuts view

  // set up defualts for route
  const basePath = '/benefit-finder/'
  const indexPath = content?.lifeEventForm.id
  const formPaths = () => {
    const formSteps = []

    stepDataArray &&
      stepDataArray.forEach((item, i) => {
        const path = item.section.heading.toLowerCase().replace(/ /g, '-')
        formSteps.push(path)
      })
    return formSteps
  }

  const ROUTES = {
    basePath,
    indexPath,
    formPaths: formPaths(),
    verifySelections: 'verify-selections',
    results: 'results',
    notEligible: 'not-eligible',
  }

  useEffect(() => {
    // catch and redirect traffic
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
      <RouteContext.Provider value={ROUTES}>
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
            <BrowserRouter basename={ROUTES.basePath}>
              <Routes>
                <Route
                  path={`/${ROUTES.indexPath}`}
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
                  ROUTES.formPaths.map((path, i) => {
                    return (
                      <Route
                        path={`/${ROUTES.indexPath}/${path}`}
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
                                ui={t}
                                // modalOpen={modalOpen}
                                // setModalOpen={setModalOpen}
                              />
                            </Form>
                          </div>
                        }
                      />
                    )
                  })}
                <Route
                  path={`/${ROUTES.indexPath}/${ROUTES.verifySelections}`}
                  element={
                    <VerifySelectionsView
                      ui={t}
                      data={stepDataArray}
                      step={step}
                      setStep={setStep}
                      indexPath={indexPath}
                    />
                  }
                />
                <Route
                  path={`/${ROUTES.indexPath}/${ROUTES.results}`}
                  element={
                    <ResultsView
                      stepDataArray={stepDataArray}
                      relevantBenefits={
                        content?.lifeEventForm?.relevantBenefits
                      }
                      data={benfitsArray}
                      setBenefitsArray={() => setBenefitsArray()}
                      setViewResults={setViewResults}
                      ui={t.resultsView}
                      notEligibleView={false}
                    />
                  }
                />
                <Route
                  path={`/${ROUTES.indexPath}/${ROUTES.results}/${ROUTES.notEligible}`}
                  element={
                    <ResultsView
                      stepDataArray={stepDataArray}
                      relevantBenefits={
                        content?.lifeEventForm?.relevantBenefits
                      }
                      data={benfitsArray}
                      setBenefitsArray={() => setBenefitsArray()}
                      setViewResults={setViewResults}
                      ui={t.resultsView}
                      notEligibleView={true}
                    />
                  }
                />
              </Routes>
            </BrowserRouter>
          </div>
        </LanguageContext.Provider>
      </RouteContext.Provider>
    )
  )
}

export default App
