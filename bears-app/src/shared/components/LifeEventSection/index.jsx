import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Fieldset,
  Heading,
  Paragraph,
  Radio,
  StepIndicator,
  Modal,
} from '../index'
import './_index.scss'

/**
 * a functional component that renders a link as a button
 * @component
 * @param {number} step - inherited current step value
 * @param {function} setStep - inherited function to inc/dec step value
 * @param {object} data - inherieted life event step data
 * @param {function} setStepData - inherited function to set index of step data
 * @param {function} setVerifyStep - inherit view handler
//  * @param {bool} verifyStep - inherited state of verification step
 * @param {function} setViewResults - inherited view handler
 * @param {object} ui - inherited ui translations
 * @return {html} returns a semantic html component that displays a form step
 */
const LifeEventSection = ({
  step,
  setStep,
  data,
  setStepData,
  setVerifyStep,
  setViewResults,
  // verifyStep,
  ui,
}) => {
  // state
  const [modal, setModal] = useState(false)
  const [currentData, setCurrentData] = useState(() => data[step - 1])
  const [values, setValues] = useState([])

  // desctructure data
  const { stepIndicator, buttonGroup, reviewSelectionModal } = ui

  const requiredFields = useRef([])
  const alertField = useRef(null)

  const handleAlert = () => {
    alertField.current.classList.remove('display-none')
    return false
  }
  const handleSuccess = () => {
    alertField.current.classList.add('display-none')
    setValues([])
    return true
  }

  const getRequiredFieldSets = () => {
    requiredFields.current.forEach(field => {
      setValues([...field.elements])
    })
  }

  const handleCheckRequriedFields = () => {
    getRequiredFieldSets()
    // check if any of these elements are checked (will add others later)
    const valid = element => element.checked === true
    return values.length === 0 || values.some(valid)
      ? handleSuccess()
      : handleAlert()
  }

  useEffect(() => {
    getRequiredFieldSets()
  }, [requiredFields])

  /**
   * a function that updates our step count and set our data index
   * @function
   * @param {number} updateIndex - value which to update step count
   * @return {null} only executes inherited functions
   */
  const handleUpdate = updateIndex => {
    if (handleCheckRequriedFields() === true) {
      setStep(step + updateIndex)
      setStepData(updateIndex)
    }
  }
  // end validation handler

  const handleUpdateData = () => {
    setCurrentData(currentData)
  }

  // handle radio state
  const [radioValue, setRadioValue] = useState('')

  const handleRadioChanged = event => {
    setRadioValue(event.target.value)
  }

  // manage the display of our modal initializer
  useEffect(() => {
    step === data.length ? setModal(true) : setModal(false)
  }, [data, modal, step])

  return (
    <div className="section">
      <StepIndicator
        current={step - 1}
        setCurrent={setStep}
        data={data}
        backLinkLabel={stepIndicator.stepBackLink}
        handleCheckRequiredFields={() => handleCheckRequriedFields()}
      />
      {currentData && (
        <div id="benefit-section" onChange={() => handleUpdateData}>
          <Heading headingLevel={2}>{currentData.section.heading}</Heading>
          <Paragraph>{currentData.section.description}</Paragraph>
          <div
            className="usa-alert usa-alert--error display-none"
            role="alert"
            ref={alertField}
          >
            <div className="usa-alert__body">
              <h4 className="usa-alert__heading">Error status</h4>
              <p className="usa-alert__text">
                All fields marked required must be completed.
              </p>
            </div>
          </div>
          {currentData.section.fieldsets.map((item, i) => {
            return (
              i === currentData.section.fieldsets.length - 1 && (
                <Fieldset
                  key={`${item.fieldset.criteriaKey}-${i}`}
                  legend={item.fieldset.legend}
                  hint={item.fieldset.hint}
                  required={item.fieldset.required}
                  alertRef={
                    item.fieldset.required === 'TRUE'
                      ? element => (requiredFields.current = [element])
                      : null
                  }
                >
                  {item.fieldset.inputs.map((input, i) => {
                    // TODO: work from here
                    // assign value to data
                    return (
                      <div key={i}>
                        {input.inputCriteria.label}
                        {input.inputCriteria.value.map((option, i) => {
                          return (
                            <Radio
                              key={i}
                              label={option.option}
                              value={option.value}
                              checked={radioValue === option.value}
                              onChange={e => handleRadioChanged(e)}
                            />
                          )
                        })}
                      </div>
                    )
                  })}
                </Fieldset>
              )
            )
          })}
        </div>
      )}
      <Button onClick={() => handleUpdate(-1)}>{buttonGroup[0].value}</Button>
      {modal === false ? (
        <Button onClick={() => handleUpdate(1)}>{buttonGroup[1].value}</Button>
      ) : (
        <div>
          <Modal
            id="nav-modal"
            modalHeading={reviewSelectionModal.heading}
            navItemOneLabel={reviewSelectionModal.buttonGroup[0].value}
            navItemOneFunction={setVerifyStep}
            navItemTwoLabel={reviewSelectionModal.buttonGroup[1].value}
            navItemTwoFunction={setViewResults}
            triggerLabel={buttonGroup[1].value}
            handleCheckRequiredFields={() => handleCheckRequriedFields()}
          />
        </div>
      )}
    </div>
  )
}

LifeEventSection.propTypes = {
  props: PropTypes.any,
  step: PropTypes.number,
  setStep: PropTypes.func,
  data: PropTypes.array,
  setStepData: PropTypes.func,
  setVerifyStep: PropTypes.func,
  setViewResults: PropTypes.func,
  // verifyStep: PropTypes.bool,
  ui: PropTypes.object,
}

export default LifeEventSection
