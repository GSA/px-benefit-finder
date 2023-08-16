import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import createMarkup from '../../utils/createMarkup'
import {
  Alert,
  Button,
  Date,
  Fieldset,
  Heading,
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
  const {
    stepIndicator,
    buttonGroup,
    reviewSelectionModal,
    requiredLabel,
    sectionHeadings,
  } = ui

  // establish refs
  const alertFieldRef = useRef(null)

  // TODO: // see if there is a way to not use so many DOM checks for vaildation
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
      field.classList.contains('required-field') &&
        field.classList.add('usa-input--error')
    })
    currentData.completed = false
    window.scrollTo(0, 0)
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
    currentData.completed = true
    setValues([])
    return true
  }

  /**
   * a function that collect all the required fields in the current step
   * @function
   */
  const getRequiredFields = () => {
    const collectedNodeList = document.querySelectorAll('.required-field')
    setValues(Array.from(collectedNodeList))
  }

  /**
   * a function that checks if all our required fields have values
   * @function
   * @return {func} either success or alert handler
   */
  const handleCheckRequriedFields = () => {
    // collect all the required fields in the current step
    getRequiredFields()
    // check if any of these elements are valid (will add others later)
    const valid = element => {
      return !element.classList.contains('required-field')
    }

    return values.length === 0 || values.every(valid)
      ? handleSuccess()
      : handleAlert()
  }

  // check for all required fields and scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
    getRequiredFields()
  }, [])

  /**
   * a function that updates our step count and set our data index
   * @function
   * @param {number} updateIndex - value which to update step count
   * @return {null} only executes inherited functions
   */
  const handleUpdate = updateIndex => {
    console.log(currentData)
    if (handleCheckRequriedFields() === true) {
      // set complete step usa-step-indicator__segment--complete
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

  /**
   * a function that handles the current selected value of our radio
   * and clears validation error if resolved
   * @function
   * @return {object} object as state
   */
  const handleDateChanged = (event, criteriaKey) => {
    const newData = { ...currentData }

    const id = event.target.id

    // construct date in standard time

    // git value by id string match
    // const standardDateValue = `${year}-${month}-${day}`

    // find the right data based on criteriakey
    const foundCriteria = newData.section.fieldsets.find(
      element => element.fieldset.criteriaKey === criteriaKey
    )
    // get those values
    const inputValues = foundCriteria.fieldset.inputs[0].inputCriteria.values

    if (id.includes('day')) {
      inputValues[0].value.day = event.target.value
    }
    if (id.includes('month')) {
      inputValues[0].value.month = event.target.value
    }
    if (id.includes('year')) {
      inputValues[0].value.year = event.target.value
    }

    inputValues[0].value = { ...inputValues[0].value }
    inputValues[0].selected = true
    setCurrentData(newData)
  }

  // manage the display of our modal initializer
  useEffect(() => {
    step === data.length ? setModal(true) : setModal(false)
  }, [currentData, data, modal, step])

  return (
    <>
      <Heading className="section-heading" headingLevel={1}>
        {step === data.length
          ? `${sectionHeadings.final}`
          : step - 1 === 0
          ? `${sectionHeadings.start}`
          : `${sectionHeadings.continue}`}
      </Heading>
      <div className="section-wrapper">
        <div className="section">
          <StepIndicator
            current={step - 1}
            setCurrent={setStep}
            data={data}
            backLinkLabel={stepIndicator.stepBackLink}
            handleCheckRequriedFields={() => handleCheckRequriedFields()}
            completed={currentData.section.completed}
          />
          {currentData && (
            <div id="benefit-section" onChange={() => handleUpdateData}>
              <Alert
                alertFieldRef={alertFieldRef}
                heading={ui.alertBanner.heading}
                description={ui.alertBanner.description}
                error
              ></Alert>
              <Heading headingLevel={2}>{currentData.section.heading}</Heading>
              <div
                dangerouslySetInnerHTML={createMarkup(
                  currentData.section.description
                )}
              ></div>

              {/* TODO: create handler component for input case switching */}

              {currentData.section.fieldsets.map((item, i) => {
                // TODO: exludes groups for now
                if (item.fieldset.fieldsets) {
                  return null
                }
                return item.fieldset.inputs[0].inputCriteria.type ===
                  'Select' ? (
                  //
                  //
                  // case select
                  //
                  //
                  <Fieldset
                    key={`${item.fieldset.criteriaKey}-${i}`}
                    legend={item.fieldset.legend}
                    hint={item.fieldset.hint}
                    required={item.fieldset.required}
                    requiredLabel={requiredLabel}
                  >
                    {item.fieldset.inputs.map((input, index) => {
                      const fieldSetId = `${item.fieldset.criteriaKey}_${index}`
                      const inputValues = input.inputCriteria.values
                      const defaultSelected = inputValues.find(
                        value => value.selected !== undefined
                      )

                      return (
                        <div key={fieldSetId}>
                          <Select
                            required={
                              defaultSelected === undefined &&
                              item.fieldset.required
                            }
                            ui={ui?.select}
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
                ) : item.fieldset.inputs[0].inputCriteria.type === 'Radio' ? (
                  //
                  //
                  // case radio
                  //
                  //
                  <Fieldset
                    key={`${item.fieldset.criteriaKey}-${i}`}
                    legend={item.fieldset.legend}
                    hint={item.fieldset.hint}
                    required={item.fieldset.required}
                    requiredLabel={requiredLabel}
                  >
                    {item.fieldset.inputs.map((input, index) => {
                      const fieldSetId = `${item.fieldset.criteriaKey}_${index}`

                      const inputValues = input.inputCriteria.values
                      const optionSelected = inputValues.find(
                        value => value.selected !== undefined
                      )

                      return (
                        <div key={fieldSetId}>
                          {/* map the options */}
                          {input.inputCriteria.values.map((option, index) => {
                            const inputId = `${fieldSetId}_${index}`

                            return (
                              <Radio
                                required={
                                  !optionSelected && item.fieldset.required
                                }
                                id={inputId}
                                key={inputId}
                                label={option.value}
                                value={option.value}
                                checked={option.selected || false}
                                onChange={event => {
                                  handleChanged(
                                    event,
                                    item.fieldset.criteriaKey
                                  )
                                }}
                              />
                            )
                          })}
                        </div>
                      )
                    })}
                  </Fieldset>
                ) : item.fieldset.inputs[0].inputCriteria.type === 'Date' ? (
                  //
                  //
                  // case date
                  //
                  //
                  <Fieldset
                    key={`${item.fieldset.criteriaKey}-${i}`}
                    legend={item.fieldset.legend}
                    hint={item.fieldset.hint}
                    required={item.fieldset.required}
                    requiredLabel={requiredLabel}
                  >
                    {item.fieldset.inputs.map((input, index) => {
                      const fieldSetId = `${item.fieldset.criteriaKey}_${index}`
                      return (
                        <div key={fieldSetId}>
                          <Date
                            required={
                              Object.keys(input.inputCriteria.values[0]?.value)
                                .length < 3
                                ? item.fieldset.required
                                : 'FALSE'
                            }
                            value={input.inputCriteria.values[0]?.value}
                            onChange={event =>
                              handleDateChanged(
                                event,
                                item.fieldset.criteriaKey
                              )
                            }
                            ui={ui}
                          />
                        </div>
                      )
                    })}
                  </Fieldset>
                ) : null
              })}
            </div>
          )}
          <Button secondary onClick={() => handleUpdate(-1)}>
            {buttonGroup[0].value}
          </Button>
          {modal === false ? (
            <Button onClick={() => handleUpdate(1)}>
              {buttonGroup[1].value}
            </Button>
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
      </div>
    </>
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
