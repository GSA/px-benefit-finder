import { useState, useEffect, useRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import { dateInputValidation, createMarkup, dataLayerUtils } from '../../utils'
import { useHandleUnload, useResetElement } from '../../hooks'
import * as apiCalls from '../../api/apiCalls'
import {
  Alert,
  Button,
  Date,
  Fieldset,
  Heading,
  RadioGroup,
  Select,
  StepIndicator,
  Modal,
} from '../index'
import './_index.scss'

/**
 * a compound component that renders the main conditional view of the form
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
  // state
  const [modal, setModal] = useState(false)
  const [currentData, setCurrentData] = useState(() => data && data[step - 1])
  const [requiredFieldsets, setRequiredFieldsets] = useState([])
  const [hasError, setHasError] = useState([])
  const [hasData, setHasData] = useState(false)
  useHandleUnload(hasData) // alert the user if they try to go back in browser
  const resetElement = useResetElement()

  useEffect(() => {
    resetElement.current?.focus()
  }, [resetElement])

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

  const handleCheckForRequiredValues = async () => {
    // TODO: collect and handle radio groups
    // const invalidRadioFieldSets = await requiredFieldsets
    //   .map(fieldset => {
    //     const radioGroup = Array.from(fieldset.elements).filter(
    //       el => el.attributes.type?.value === 'radio'
    //     )

    //     // find the parent fieldset and return
    //     if (radioGroup.every(group => !group.checked)) {
    //       // get an id from the radio group
    //       const groupId = radioGroup[0]?.name
    //       const trimmedGroupId = groupId && groupId.replace(/_[0-9]/, '')
    //       // if the id matches the id in our fieldset return the fieldset
    //       const invalidRadioSets = requiredFieldsets.filter(
    //         fieldset => fieldset.id === trimmedGroupId
    //       )
    //       return invalidRadioSets
    //     } else {
    //       return undefined
    //     }
    //   })
    //   .flat()

    // console.log('invalidRadioFieldSets', invalidRadioFieldSets)

    const invalidElements = await requiredFieldsets
      .map(fieldset => {
        return (
          Array.from(fieldset.elements)
            // check all the required inputs, if there is no value, there the input is invalid
            .filter(el => {
              // we need to custom handle our dates verification to ensure a 4 digit year
              if (el.attributes['data-datetype']?.value === 'year') {
                return !el.value || (el.value && el.value.length !== 4)
              }
              return !el.value
            })
        )
      })
      .flat()

    // const mergeInvalidElements = [...invalidElements]

    setHasError(invalidElements)
    return invalidElements.length === 0
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
    currentData.completed = false
    window.scrollTo(0, 0)
  }

  /**
   * a function that triggers the modal to a closed state
   * @function
   */
  const handleSuccess = () => {
    // hide alert by adding the display class
    alertFieldRef.current.classList.add('display-none')
    currentData.completed = true
    handleUpdateData()
    setRequiredFieldsets([])
  }

  /**
   * a function that collect all the required fields in the current step
   * @function
   */
  const getRequiredFieldsets = () => {
    const collectedNodeList = document.querySelectorAll('fieldset')
    const requiredNodeList = Array.from(collectedNodeList).filter(
      node => node.attributes.required
    )
    setRequiredFieldsets(Array.from(requiredNodeList))
  }

  /**
   * a function that checks if all our required fields have values
   * @function
   * @return {func} either success or alert handler
   */
  const handleCheckRequriedFields = () => {
    // collect all the required fields in the current step
    handleCheckForRequiredValues().then(valid => {
      valid === true ? handleSuccess() : handleAlert()
    })
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
    handleCheckRequriedFields()
    handleCheckForRequiredValues().then(valid => {
      if (valid === true) {
        // handle dataLayer
        const { errors } = dataLayerUtils.dataLayerStructure
        dataLayerUtils.dataLayerPush(window, {
          event: errors.event,
          bfData: {
            errors: '',
            errorCount: {
              number: 0,
              string: `0`,
            },
            formSuccess: true,
          },
        })
        setStep(step + updateIndex)
        setStepData(updateIndex)
        resetElement && resetElement.current.focus()
      }
    })
  }

  /**
   * a function that updates our step count and set our data index
   * @function
   * @param {number} updateIndex - value which to update step count
   * @return {null} only executes inherited functions
   */
  const handleBackUpdate = updateIndex => {
    setStep(step + updateIndex)
    resetElement.current.focus()
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
    hasError.length > 0 && handleCheckForRequiredValues()
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
    if (dateInputValidation(event) === true) {
      apiCalls.PUT.DataDate(
        criteriaKey,
        currentData,
        setCurrentData,
        event.target.value,
        event.target.id
      )
      hasError.length > 0 && handleCheckForRequiredValues()
    }
  }

  // manage the display of our modal initializer
  useEffect(() => {
    data && step === data.length ? setModal(true) : setModal(false)
  }, [currentData, data, modal, step])

  // check for all required fields and scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
    getRequiredFieldsets()
  }, [])

  // handle dataLayer
  useEffect(() => {
    const { lifeEventSection } = dataLayerUtils.dataLayerStructure
    modalOpen === false &&
      dataLayerUtils.dataLayerPush(window, {
        event: lifeEventSection.event,
        bfData: {
          pageView: `${lifeEventSection.bfData.pageView}-${step}`,
          viewTitle: currentData.section.heading,
        },
      })
  }, [])

  return (
    data && (
      <>
        <Heading className="bf-section-heading" headingLevel={1}>
          {step === data.length
            ? `${sectionHeadings.final}`
            : step - 1 === 0
              ? `${sectionHeadings.start}`
              : `${sectionHeadings.continue}`}
        </Heading>
        <div className="bf-section-wrapper">
          <div className="bf-section-info">
            <StepIndicator
              current={step - 1}
              setCurrent={setStep}
              data={data}
              backLinkLabel={stepIndicator.stepBackLink}
              handleCheckRequriedFields={() => handleForwardUpdate(1)}
              key={`step-indicator-${sectionHeadings}`}
            />
            {currentData && (
              <div id="bf-section">
                <Alert
                  alertFieldRef={alertFieldRef}
                  heading={ui.alertBanner.heading}
                  description={ui.alertBanner.description}
                  type="error"
                  hasError={hasError.length > 0}
                  errorCount={hasError.length}
                  errorList={hasError}
                ></Alert>
                <div className="bf-form-heading-group">
                  <Heading
                    className="bf-form-heading bf-usa-form-heading"
                    headingLevel={2}
                  >
                    {currentData.section.heading}
                  </Heading>
                  <div
                    className="bf-section-sub-heading"
                    dangerouslySetInnerHTML={createMarkup(
                      currentData.section.description
                    )}
                  ></div>
                </div>
                {currentData.section.fieldsets.map((item, i) => {
                  const Input = ({ item, children, index, hidden }) =>
                    item.fieldset.inputs[0].inputCriteria.type === 'Select' ? (
                      //
                      //
                      // case select
                      //
                      //
                      <Fragment
                        key={`select-${item.fieldset.criteriaKey}+${index}`}
                      >
                        <Fieldset
                          key={`select-${item.fieldset.criteriaKey}-${index}`}
                          legend={item.fieldset.legend}
                          errorMessage={item.fieldset.errorMessage}
                          hint={item.fieldset.hint}
                          required={item.fieldset.required}
                          requiredLabel={requiredLabel}
                          hidden={hidden && hidden}
                          id={item.fieldset.criteriaKey}
                          invalid={
                            item.fieldset.required &&
                            hasError
                              .map(errorItem => {
                                return (
                                  errorItem.id !== undefined &&
                                  errorItem.id.includes(
                                    item.fieldset?.criteriaKey
                                  )
                                )
                              })
                              .includes(true)
                          }
                          ui={ui.errorText}
                        >
                          {item.fieldset.inputs.map((input, index) => {
                            const fieldSetId = `${item.fieldset.criteriaKey}_${index}`
                            const inputValues = input.inputCriteria.values
                            const defaultSelected = inputValues.find(
                              value => value.selected !== undefined
                            )

                            const invalid =
                              item.fieldset.required &&
                              hasError
                                .map(item => {
                                  return (
                                    item.id !== undefined &&
                                    fieldSetId.includes(item.id)
                                  )
                                })
                                .includes(true)

                            const { select, errorText } = ui

                            return (
                              <div key={fieldSetId}>
                                <Select
                                  ui={{ select, errorText }}
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
                                  invalid={invalid}
                                  legend={item.fieldset.legend}
                                  errorMessage={item.fieldset.errorMessage}
                                />
                              </div>
                            )
                          })}
                        </Fieldset>
                        {children || null}
                      </Fragment>
                    ) : item.fieldset.inputs[0].inputCriteria.type ===
                      'Radio' ? (
                      //
                      //
                      // case radio
                      //
                      //
                      <Fragment
                        key={`radio-${item.fieldset.criteriaKey}+${index}`}
                      >
                        {item.fieldset.inputs.map((input, index) => {
                          const fieldSetId = `${item.fieldset.criteriaKey}_${index}`

                          const invalid =
                            item.fieldset.required &&
                            hasError
                              .map(errorItem => {
                                return (
                                  errorItem.id !== undefined &&
                                  errorItem.id.includes(
                                    item.fieldset?.criteriaKey
                                  )
                                )
                              })
                              .includes(true)

                          return (
                            <Fieldset
                              key={`radio-${item.fieldset.criteriaKey}-${index}`}
                              id={item.fieldset.criteriaKey}
                              legend={item.fieldset.legend}
                              errorMessage={item.fieldset.errorMessage}
                              hint={item.fieldset.hint}
                              required={item.fieldset.required}
                              requiredLabel={requiredLabel}
                              hidden={hidden && hidden}
                              ui={ui.errorText}
                              invalid={invalid}
                            >
                              <RadioGroup
                                invalid={invalid}
                                key={fieldSetId}
                                fieldSetId={fieldSetId}
                                handleChanged={handleChanged}
                                values={input.inputCriteria.values}
                                criteriaKey={item.fieldset.criteriaKey}
                                errorMessage={item.fieldset.errorMessage}
                                legend={item.fieldset.legend}
                                ui={ui.errorText}
                              />
                            </Fieldset>
                          )
                        })}
                        {children || null}
                      </Fragment>
                    ) : item.fieldset.inputs[0].inputCriteria.type ===
                      'Date' ? (
                      //
                      //
                      // case date
                      //
                      //
                      <Fragment
                        key={`date-${item.fieldset.criteriaKey}+${index}`}
                      >
                        <Fieldset
                          key={`date-${item.fieldset.criteriaKey}-${index}`}
                          legend={item.fieldset.legend}
                          errorMessage={item.fieldset.errorMessage}
                          hint={item.fieldset.hint}
                          required={item.fieldset.required}
                          requiredLabel={requiredLabel}
                          hidden={hidden && hidden}
                          id={item.fieldset.criteriaKey}
                          invalid={
                            item.fieldset.required &&
                            hasError
                              .map(errorItem => {
                                return (
                                  errorItem.id !== undefined &&
                                  errorItem.id.includes(
                                    item.fieldset?.criteriaKey
                                  )
                                )
                              })
                              .includes(true)
                          }
                          ui={ui.errorText}
                        >
                          {item.fieldset.inputs.map((input, index) => {
                            const fieldSetId = `${item.fieldset.criteriaKey}_${index}`

                            const invalid =
                              item.fieldset.required &&
                              hasError.filter(item => {
                                return (
                                  item.id !== undefined &&
                                  item.id.includes(fieldSetId)
                                )
                              })

                            return (
                              <div key={fieldSetId}>
                                <Date
                                  value={input.inputCriteria.values[0]?.value}
                                  onChange={event =>
                                    handleDateChanged(
                                      event,
                                      item.fieldset.criteriaKey
                                    )
                                  }
                                  ui={ui}
                                  errorMessage={item.fieldset.errorMessage}
                                  parentLegend={item.fieldset.legend}
                                  id={fieldSetId}
                                  invalid={invalid}
                                />
                              </div>
                            )
                          })}
                        </Fieldset>
                        {children || null}
                      </Fragment>
                    ) : null

                  const parentElement = ({ item, i }) =>
                    Input({ item, index: i })

                  const checkParentValue = item => {
                    const selectedParentValue = apiCalls.GET.SelectedValue(item)

                    /**
                     * a value that checks the selected parent validator to expose child inputs in the form
                     * @return {boolean} returns true or false
                     */

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
                          child.fieldsets.map((childItem, childItemIndex) => {
                            // if a parent determines the children inputs are hidden, we expect that the seleted values in child items are de-selected
                            const selectedValue =
                              childItem && apiCalls.GET.SelectedValue(childItem)

                            const isHidden = checkParentValue(item)

                            if (
                              isHidden === true &&
                              selectedValue !== undefined
                            ) {
                              delete selectedValue.selected
                            }

                            return Input({
                              item: childItem,
                              index: childItemIndex,
                              hidden: isHidden,
                            })
                          })
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
            <div className="bf-section-nav-btn-group">
              <Button outline onClick={() => handleBackUpdate(-1)}>
                {buttonGroup[0].value}
              </Button>
              {modal === false ? (
                <Button secondary onClick={() => handleForwardUpdate(1)}>
                  {buttonGroup[1].value}
                </Button>
              ) : (
                <div>
                  <Modal
                    id="nav-modal"
                    dataLayerValue={{ viewTitle: currentData.section.heading }}
                    modalHeading={reviewSelectionModal.heading}
                    navItemOneLabel={reviewSelectionModal.buttonGroup[0].value}
                    navItemOneFunction={setVerifyStep}
                    navItemTwoLabel={reviewSelectionModal.buttonGroup[1].value}
                    navItemTwoFunction={setViewResults}
                    triggerLabel={buttonGroup[1].value}
                    handleCheckRequriedFields={handleCheckForRequiredValues}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    completed={currentData.completed}
                    alertElement={alertFieldRef}
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
