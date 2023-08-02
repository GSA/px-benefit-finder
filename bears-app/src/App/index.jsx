import { useState, createContext } from 'react'
import {
  Intro,
  LifeEvenSection,
  Button,
  Heading,
  Form,
} from '../shared/components'
// data
// import * as apiCalls from '../shared/api/api-calls'
import * as en from '../shared/locales/en/en.json'
import * as es from '../shared/locales/es/es.json'
import content from '../shared/api/mock-data/content-data'

/**
 * a functional component that renders our application.
 * @component
 */
function App() {
  const LanguageContext = createContext({ en, es })

  // /**
  //  * lazy load our data state.
  //  * @function
  //  * @param {promise} setData - the state of environment
  //  * @return {state} returns null if not set
  //  */
  // const [data, setData] = useState(() => {
  //   apiCalls.GETLifeEvent().then(response => setData(response))
  // })

  // handlers

  // /**
  //  * handle our data maping.
  //  * @function
  //  * @param {object} data - the json object returned from data load
  //  * @return {string} returns strigified data
  //  */
  // const handleData = data => {
  //   if (data === undefined) {
  //     return 'loading...'
  //   }
  //   // either return the mapped data object or the error
  //   return data?.data ? data.data.map(d => JSON.stringify(d)) : data
  // }

  const handleLanguage = () => {
    const string = /^\/es/
    return string.test(window.location.pathname) ? es : en
  }

  // destructure data
  const { lifeEventForm } = JSON.parse(content)
  const stepDataArray = lifeEventForm.sectionsEligibilityCriteria

  // state
  const [t] = useState(handleLanguage)
  const [step, setStep] = useState(0)
  const [stepData, setStepData] = useState(stepDataArray[step])
  const [verifyStep, setVerifyStep] = useState(false)
  const [viewResults, setViewResults] = useState(false)

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
          <div>
            <Heading headingLevel={2}>View results</Heading>
            <Button
              className="step-back-link"
              unstyled
              onClick={() => {
                setVerifyStep(false)
                setViewResults(false)
              }}
            >
              Back
            </Button>
          </div>
        ) : verifyStep === false ? (
          <Form>
            <LifeEvenSection
              step={step}
              setStep={setStep}
              data={stepDataArray}
              stepData={stepData}
              setStepData={setStepData}
              verifyStep={verifyStep}
              setVerifyStep={() => setVerifyStep(true)}
              setViewResults={() => setViewResults(true)}
            />
          </Form>
        ) : (
          <div>
            <Heading headingLevel={2}>Verify selections</Heading>
            <Button
              onClick={() => {
                setViewResults(true)
              }}
            >
              Continue
            </Button>
            <Button
              onClick={() => {
                setVerifyStep(false)
                setViewResults(false)
              }}
            >
              Return to Previous Step
            </Button>
          </div>
        )}
      </div>
    </LanguageContext.Provider>
  )
}

export default App
