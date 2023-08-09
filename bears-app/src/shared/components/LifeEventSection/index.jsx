import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Fieldset,
  Heading,
  Paragraph,
  Radio,
  Select,
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
 * @param {function} setViewResults - inherited view handler
 * @param {object} ui - inherited ui translations
 * @return {html} returns a semantic html component that displays a form step
 */
const LifeEventSection = ({
  step,
  setStep,
  data,
  handleData,
  setStepData,
  setVerifyStep,
  setViewResults,
  ui,
}) => {
  // state
  const [modal, setModal] = useState(false)
  const [currentData, setCurrentData] = useState(() => data[step - 1])
  const [values, setValues] = useState([])

  // desctructure data
  const { stepIndicator, buttonGroup, reviewSelectionModal, requiredLabel } = ui

  // establish refs
  const requiredFieldsRef = useRef([])
  const alertFieldRef = useRef(null)

  // handlers
  /**
   * a function that handles class state on our collected required fields
   * @function
   * @return {html}
   */
  const handleAlert = () => {
    // remove the display class from the alert
    alertFieldRef.current.classList.remove('display-none')
    // add to all the collected error fields an error class
    values.forEach(field => {
      field.classList.add('usa-input--error')
    })
    return false
  }
  /**
   * a function that triggers the modal to a closed state
   * @function
   */
  const handleSuccess = () => {
    // hide alert by adding the display class
    alertFieldRef.current.classList.add('display-none')
    // remove from all the collected error fields the error class
    values.forEach(field => {
      field.classList.remove('usa-input--error')
    })
    setValues([])
    return true
  }

  // collect all the required fields in the current step
  const getrequiredFieldsRefs = () => {
    requiredFieldsRef.current.forEach(field => {
      setValues([...field.elements])
    })
  }

  const handleCheckRequriedFields = () => {
    // collect all the required fields in the current step
    getrequiredFieldsRefs()
    // check if any of these elements are checked (will add others later)
    const valid = element => element.checked === true
    return values.length === 0 || values.some(valid)
      ? handleSuccess()
      : handleAlert()
  }

  useEffect(() => {
    getrequiredFieldsRefs()
  }, [requiredFieldsRef])

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

  /**
   * a function that updates our current data state
   * @function
   * @return {object} object as state
   */
  const handleUpdateData = () => {
    handleData([...currentData])
    setCurrentData(currentData)
  }

  /**
   * a function that handles the current selected value of our radio
   * and clears validation error if resolved
   * @function
   * @return {object} object as state
   */
  const handleChanged = (event, criteriaKey) => {
    const newData = { ...currentData }
    // find the right data based on criteriakey
    const foundCriteria = newData.section.fieldsets.find(
      element => element.fieldset.criteriaKey === criteriaKey
    )
    // get those values
    const inputValues = foundCriteria.fieldset.inputs[0].inputCriteria.values

    inputValues.forEach(value => {
      if (value.value === event.target.value) {
        value.selected = true
      } else {
        delete value.selected
      }
    })
    setCurrentData(newData)
  }

  // manage the display of our modal initializer
  useEffect(() => {
    step === data.length ? setModal(true) : setModal(false)
  }, [currentData, data, modal, step])

  return (
    <div className="section">
      <StepIndicator
        current={step - 1}
        setCurrent={setStep}
        data={data}
        backLinkLabel={stepIndicator.stepBackLink}
        handleCheckRequriedFields={() => handleCheckRequriedFields()}
      />
      {currentData && (
        <div id="benefit-section" onChange={() => handleUpdateData}>
          <Heading headingLevel={2}>{currentData.section.heading}</Heading>
          <Paragraph>{currentData.section.description}</Paragraph>
          <div
            className="usa-alert usa-alert--error display-none"
            role="alert"
            ref={alertFieldRef}
          >
            <div className="usa-alert__body">
              <h4 className="usa-alert__heading">Error status</h4>
              <p className="usa-alert__text">
                All fields marked required must be completed.
              </p>
            </div>
          </div>
          {currentData.section.fieldsets.map((item, i) => {
            return item.fieldset.inputs[0].inputCriteria.type === 'select' ? (
              <Fieldset
                key={`${item.fieldset.criteriaKey}-${i}`}
                legend={item.fieldset.legend}
                hint={item.fieldset.hint}
                required={item.fieldset.required}
                requiredLabel={requiredLabel}
                alertRef={
                  item.fieldset.required === 'TRUE'
                    ? element => (requiredFieldsRef.current = [element])
                    : null
                }
              >
                {item.fieldset.inputs.map((input, index) => {
                  // TODO: work from here
                  // assign value to data
                  const fieldSetId = `${item.fieldset.criteriaKey}_${index}`
                  const inputValues = input.inputCriteria.values
                  const defaultSelected = inputValues.find(
                    value => value.selected !== undefined
                  )

                  return (
                    <div key={fieldSetId}>
                      <Select
                        htmlFor={fieldSetId}
                        key={fieldSetId}
                        options={inputValues}
                        selected={defaultSelected?.value}
                        onChange={event =>
                          handleChanged(event, item.fieldset.criteriaKey)
                        }
                      />
                    </div>
                  )
                })}
              </Fieldset>
            ) : item.fieldset.inputs[0].inputCriteria.type === 'radio' ? (
              <Fieldset
                key={`${item.fieldset.criteriaKey}-${i}`}
                legend={item.fieldset.legend}
                hint={item.fieldset.hint}
                required={item.fieldset.required}
                requiredLabel={requiredLabel}
                alertRef={
                  item.fieldset.required === 'TRUE'
                    ? element => (requiredFieldsRef.current = [element])
                    : null
                }
              >
                {item.fieldset.inputs.map((input, index) => {
                  const fieldSetId = `${item.fieldset.criteriaKey}_${index}`
                  return (
                    <div key={fieldSetId}>
                      {input.inputCriteria.label}
                      {/* map the options */}
                      {input.inputCriteria.values.map((option, index) => {
                        const inputId = `${fieldSetId}_${index}`
                        return (
                          <Radio
                            id={inputId}
                            key={inputId}
                            label={`${option.value}_${inputId}`}
                            value={option.value}
                            checked={option.selected || false}
                            onChange={event => {
                              handleChanged(event, item.fieldset.criteriaKey)
                            }}
                          />
                        )
                      })}
                    </div>
                  )
                })}
              </Fieldset>
            ) : null
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
            handleCheckRequriedFields={handleCheckRequriedFields}
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
  ui: PropTypes.object,
}

export default LifeEventSection
