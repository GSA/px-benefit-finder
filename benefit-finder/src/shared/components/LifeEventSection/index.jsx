import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import createMarkup from '../../utils/createMarkup'
import { dateInputValidation } from '../../utils/inputValidation'
import { useHandleUnload } from '../../hooks/useHandleUnload'
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
  modalOpen,
  setModalOpen,
}) => {
  // const currentStep = step - 1
  // state
  const [modal, setModal] = useState(false)
  const [currentData, setCurrentData] = useState(() => data && data[step - 1])
  const [values, setValues] = useState([])
  const [hasError, setHasError] = useState([])
  const classError = 'usa-input--error'
  const [hasData, setHasData] = useState(false)
  useHandleUnload(hasData) // alert the user if they try to go back in browser

  // desctructure data
  const {
    stepIndicator,
    buttonGroup,
    reviewSelectionModal,
    requiredLabel,
    sectionHeadings,
  } = ui

  /**
   * a function that updates our current data state
   * @function
   * @return {object} object as state
   */
  const handleUpdateData = () => {
    data[step - 1] = { ...currentData }
    handleData([...data])
  }

  const handleFieldAlerts = () => {
    setHasError(document.querySelectorAll(`.${classError}`))
  }

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
    alertFieldRef.current.focus()
    // add to all the collected error fields an error class
    values.forEach(field => {
      field.classList.contains('required-field') &&
        field.classList.add(classError)
    })
    handleFieldAlerts()
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
      field.classList.remove(classError)
    })
    currentData.completed = true
    handleUpdateData()
    setValues([])
    return true
  }

  /**
   * a function that collect all the required fields in the current step
   * @function
   */
  const getRequiredFields = () => {
    const collectedNodeList = document.querySelectorAll('input, select')
    const requiredNodeList = Array.from(collectedNodeList).filter(
      node => node.attributes.required
    )
    setValues(Array.from(requiredNodeList))
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
      document.activeElement.blur()
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
    document.activeElement.blur()
  }

  /**
   * a function that handles the current selected value of our radio
   * and clears validation error if resolved
   * @function
   * @return {object} object as state
   */
  const handleChanged = (event, criteriaKey) => {
    event.target.value.length > 0 && setHasData(true)
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
    event.target.value.length > 0 && setHasData(true)
    window.history.replaceState({}, '', window.location.pathname)
    dateInputValidation(event) === true &&
      apiCalls.PUT.DataDate(
        criteriaKey,
        currentData,
        setCurrentData,
        event.target.value,
        event.target.id
      )
  }

  const handleDateRequired = (values, item) => {
    return Object.keys(values?.value).length === 3 &&
      values?.value?.year?.length === 4
      ? 'FALSE'
      : item.fieldset.required
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
              key={`step-indicator-${sectionHeadings}`}
            />
            {currentData && (
              <div id="benefit-section">
                <Alert
                  alertFieldRef={alertFieldRef}
                  heading={ui.alertBanner.heading}
                  description={ui.alertBanner.description}
                  error
                ></Alert>
                <Heading className="benefit-section-heading" headingLevel={2}>
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
                                  required={handleDateRequired(
                                    input.inputCriteria.values[0],
                                    item
                                  )}
                                  value={input.inputCriteria.values[0]?.value}
                                  onChange={event =>
                                    handleDateChanged(
                                      event,
                                      item.fieldset.criteriaKey
                                    )
                                  }
                                  ui={ui}
                                  id={fieldSetId}
                                  valid={
                                    hasError.length &&
                                    Array.from(hasError)
                                      .map(item => item.id.includes(fieldSetId))
                                      .includes(true)
                                  }
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
            <div className="section-nav-btn-group">
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
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    completed={currentData.completed}
                  />
                </div>
              )}
            </div>
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
