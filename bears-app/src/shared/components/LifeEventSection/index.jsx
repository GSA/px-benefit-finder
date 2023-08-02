import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, StepIndicator, Modal } from '../index'
import './_index.scss'

/**
 * a functional component that renders a link as a button
 * @component
 * @param {number} step - inherited current step value
 * @param {function} setStep - inherited function to inc/dec step value
 * @param {object} data - inherieted life event step data
 * @param {function} setStepData - inherited function to set index of step data
 * @param {function} setVerifyStep - inherit view handler
 * @param {bool} verifyStep - inherited state of verification step
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
  verifyStep,
  ui,
}) => {
  // state
  const [modal, setModal] = useState(false)

  // desctructure data
  const { stepIndicator, buttonGroup, reviewSelectionModal } = ui

  /**
   * a function that updates our step count and set our data index
   * @function
   * @param {number} updateIndex - value which to update step count
   * @return {null} only executes inherited functions
   */
  const handleUpdate = updateIndex => {
    setStep(step + updateIndex)
    setStepData(updateIndex)
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
        onClick={handleUpdate}
        backLinkLabel={stepIndicator.stepBackLink}
      />
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
            verifyStep={verifyStep}
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
  data: PropTypes.object,
  setStepData: PropTypes.func,
  setVerifyStep: PropTypes.func,
  setViewResults: PropTypes.func,
  verifyStep: PropTypes.bool,
  ui: PropTypes.object,
}

export default LifeEventSection
