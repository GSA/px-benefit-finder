import { useState, createContext, useEffect, useMemo } from 'react'
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
  const language = apiCalls.GET.Language()
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

  useEffect(() => {
    content && setBenefitsArray([...content.benefits])
    content &&
      setStepDataArray([...content.lifeEventForm.sectionsEligibilityCriteria])
  }, [content])

  // state
  const [t] = useState(language === 'es' ? es : en) // tranlations

  // update data basd on passed query paramaters
  useEffect(() => {
    if (hasQueryParams) {
      stepDataArray &&
        apiCalls.PUT.DataFromParams(
          windowQuery,
          stepDataArray,
          setBenefitsArray,
          benfitsArray,
          sharedToken
        )
    }
  }, [windowQuery, hasQueryParams, stepDataArray])

  /**
   * Memoized base paths.
   *
   * @type {Object} An object containing base routes.
   *
   * @description This value is memoized to prevent unnecessary recalculations.
   */
  const BASE_ROUTES = useMemo(() => {
    /**
     * Retrieve routes from the application API based on the current window, language, and step data array.
     *
     * @param {Object} window - The current window object.
     * @param {string} language - The current language.
     * @param {Array} stepDataArray - An array of step data.
     *
     * @returns {Object} An object containing routes.
     */
    return apiCalls.GET.Routes(window, language, stepDataArray)
  }, [])

  /**
   * Retrieve routes for the form steps based on content.
   *
   * @type {Object} An object containing routes for the form steps.
   */
  const FORM_ROUTES = apiCalls.GET.Routes(window, language, stepDataArray)

  /**
   * A composite object containing both base routes and form paths.
   *
   * @type {Object} An object containing both base routes and form paths.
   *
   * @property {Object} The base routes.
   * @property {Object} formPaths - The form paths.
   */
  const ROUTES = { ...BASE_ROUTES, formPaths: FORM_ROUTES.formPaths }

  return (
    content &&
    ROUTES.formPaths && (
      <RouteContext.Provider value={ROUTES}>
        <LanguageContext.Provider value={t}>
          {isDraftMode === true && <Alert>Draft Mode</Alert>}
          <div
            id={content?.lifeEventForm.id}
            className="benefit-finder"
            data-testid="app"
            data-version={version}
          >
            <BrowserRouter basename={`/${ROUTES.basePath}`}>
              <Routes>
                <Route
                  path={`/${ROUTES.indexPath}`}
                  element={
                    stepDataArray && (
                      <Intro
                        content={content.lifeEventForm}
                        ui={t.intro}
                        stepDataArray={stepDataArray}
                        indexPath={`/${ROUTES.indexPath}/`}
                        hasQueryParams={hasQueryParams}
                      />
                    )
                  }
                />
                {ROUTES.formPaths.map((path, i) => {
                  return (
                    <Route
                      path={`/${ROUTES.indexPath}/${path}`}
                      key={i}
                      element={
                        <div>
                          <Form>
                            <LifeEventSection
                              data={stepDataArray}
                              handleData={setStepDataArray}
                              ui={t}
                            />
                          </Form>
                        </div>
                      }
                    />
                  )
                })}
                <Route
                  path={`/${ROUTES.indexPath}/${ROUTES.verifySelectionsPath}`}
                  element={
                    <VerifySelectionsView
                      ui={t}
                      data={stepDataArray}
                      indexPath={ROUTES.indexPath}
                    />
                  }
                />
                {Object.keys(ROUTES.resultsPaths).map((route, i) => {
                  return (
                    <Route
                      path={`/${ROUTES.indexPath}/${ROUTES.resultsPaths[route]}`}
                      key={i}
                      element={
                        <ResultsView
                          stepDataArray={stepDataArray}
                          relevantBenefits={
                            content?.lifeEventForm?.relevantBenefits
                          }
                          data={benfitsArray}
                          setBenefitsArray={() => setBenefitsArray()}
                          ui={t.resultsView}
                          notEligibleView={i !== 0}
                        />
                      }
                    />
                  )
                })}
              </Routes>
            </BrowserRouter>
          </div>
        </LanguageContext.Provider>
      </RouteContext.Provider>
    )
  )
}

export default App
