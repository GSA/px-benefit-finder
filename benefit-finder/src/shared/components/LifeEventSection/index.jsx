import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import createMarkup from '../../utils/createMarkup'
import * as apiCalls from '../../api/apiCalls'
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
  const [currentData, setCurrentData] = useState(() => data && data[step - 1])
  const [values, setValues] = useState([])

  // desctructure data
  const {
    stepIndicator,
    buttonGroup,
    reviewSelectionModal,
    requiredLabel,
    sectionHeadings,
  } = ui

  /**
   *
   * start alert
   *
   */
  // establish refs
  const alertFieldRef = useRef(null)

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
  /**
   *
   * end alert
   *
   */

  /**
   * a function that updates our step count and set our data index
   * @function
   * @param {number} updateIndex - value which to update step count
   * @return {null} only executes inherited functions
   */
  const handleForwardUpdate = updateIndex => {
    if (handleCheckRequriedFields() === true) {
      // set complete step usa-step-indicator__segment--complete
      setStep(step + updateIndex)
      setStepData(updateIndex)
    }
  }

  /**
   * a function that updates our step count and set our data index
   * @function
   * @param {number} updateIndex - value which to update step count
   * @return {null} only executes inherited functions
   */
  const handleBackUpdate = updateIndex => {
    setStep(step + updateIndex)
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
    window.history.replaceState({}, '', window.location.pathname)
    apiCalls.PUT.Data(
      criteriaKey,
      currentData,
      setCurrentData,
      event.target.value
    )
  }

  /**
   * a function that handles the current selected value of our radio
   * and clears validation error if resolved
   * @function
   * @return {object} object as state
   */
  const handleDateChanged = (event, criteriaKey) => {
    window.history.replaceState({}, '', window.location.pathname)
    apiCalls.PUT.DataDate(
      criteriaKey,
      currentData,
      setCurrentData,
      event.target.value,
      event.target.id
    )
  }

  // manage the display of our modal initializer
  useEffect(() => {
    data && step === data.length ? setModal(true) : setModal(false)
  }, [currentData, data, modal, step])

  // check for all required fields and scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
    getRequiredFields()
  }, [])

  console.log('currentData', currentData, 'step', step)

  return (
    data && (
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
              key={`step-indicator-${sectionHeadings}`}
            />
            {currentData && (
              <div id="benefit-section" onChange={() => handleUpdateData}>
                <Alert
                  alertFieldRef={alertFieldRef}
                  heading={ui.alertBanner.heading}
                  description={ui.alertBanner.description}
                  error
                ></Alert>
                <Heading headingLevel={2}>
                  {currentData.section.heading}
                </Heading>
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    currentData.section.description
                  )}
                ></div>

                {currentData.section.fieldsets.map((item, i) => {
                  const Input = ({ item, children, index, hidden }) =>
                    item.fieldset.inputs[0].inputCriteria.type === 'Select' ? (
                      //
                      //
                      // case select
                      //
                      //
                      <>
                        <Fieldset
                          key={`select-${item.fieldset.criteriaKey}-${index}`}
                          legend={item.fieldset.legend}
                          hint={item.fieldset.hint}
                          required={item.fieldset.required}
                          requiredLabel={requiredLabel}
                          hidden={hidden && hidden}
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
                                    handleChanged(
                                      event,
                                      item.fieldset.criteriaKey
                                    )
                                  }
                                />
                              </div>
                            )
                          })}
                        </Fieldset>
                        {children || null}
                      </>
                    ) : item.fieldset.inputs[0].inputCriteria.type ===
                      'Radio' ? (
                      //
                      //
                      // case radio
                      //
                      //
                      <>
                        <Fieldset
                          key={`radio-${item.fieldset.criteriaKey}-${index}`}
                          legend={item.fieldset.legend}
                          hint={item.fieldset.hint}
                          required={item.fieldset.required}
                          requiredLabel={requiredLabel}
                          hidden={hidden && hidden}
                        >
                          {item.fieldset.inputs.map((input, index) => {
                            const fieldSetId = `${item.fieldset.criteriaKey}_${index}`

                            const inputValues = input.inputCriteria.values
                            const optionSelected = inputValues.find(
                              value => value.selected !== undefined
                            )

                            return (
                              <div className="radio-group" key={fieldSetId}>
                                {/* map the options */}
                                {input.inputCriteria.values.map(
                                  (option, index) => {
                                    const inputId = `${fieldSetId}_${index}`

                                    return (
                                      <Radio
                                        required={
                                          !optionSelected &&
                                          item.fieldset.required
                                        }
                                        name={fieldSetId}
                                        key={inputId}
                                        id={inputId}
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
                                  }
                                )}
                              </div>
                            )
                          })}
                        </Fieldset>
                        {children || null}
                      </>
                    ) : item.fieldset.inputs[0].inputCriteria.type ===
                      'Date' ? (
                      //
                      //
                      // case date
                      //
                      //
                      <>
                        <Fieldset
                          key={`date-${item.fieldset.criteriaKey}-${index}`}
                          legend={item.fieldset.legend}
                          hint={item.fieldset.hint}
                          required={item.fieldset.required}
                          requiredLabel={requiredLabel}
                          hidden={hidden && hidden}
                        >
                          {item.fieldset.inputs.map((input, index) => {
                            const fieldSetId = `${item.fieldset.criteriaKey}_${index}`
                            return (
                              <div key={fieldSetId}>
                                <Date
                                  required={
                                    Object.keys(
                                      input.inputCriteria.values[0]?.value
                                    ).length < 3
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
                        {children || null}
                      </>
                    ) : null

                  const parentElement = ({ item, i }) =>
                    Input({ item, index: i })

                  const checkParentValue = item => {
                    const selectedParentValue = apiCalls.GET.SelectedValue(item)

                    const hidden =
                      selectedParentValue?.value !==
                      item.fieldset.inputs[0].inputCriteria
                        .childDependencyOption

                    return hidden
                  }

                  const parentWithChildElement = ({ item, i }) => {
                    return Input({
                      item,
                      index: i,
                      children: item.fieldset.children.map(
                        (child, i) =>
                          child.fieldsets.length &&
                          child.fieldsets.map((childItem, childItemIndex) =>
                            Input({
                              item: childItem,
                              index: childItemIndex,
                              hidden: checkParentValue(item),
                            })
                          )
                      ),
                    })
                  }

                  // children check
                  const fieldSet = () =>
                    item.fieldset.children.length > 0
                      ? parentWithChildElement({ item, i })
                      : parentElement({ item, i })

                  return fieldSet()
                })}
              </div>
            )}
            <Button secondary onClick={() => handleBackUpdate(-1)}>
              {buttonGroup[0].value}
            </Button>
            {modal === false ? (
              <Button onClick={() => handleForwardUpdate(1)}>
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
