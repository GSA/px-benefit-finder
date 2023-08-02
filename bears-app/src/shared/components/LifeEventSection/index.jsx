import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, StepIndicator, Modal } from '../index'
import './_index.scss'

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
  const [modal, setModal] = useState(false)
  const { stepIndicator, buttonGroup, reviewSelectionModal } = ui

  // update our step count and set our data index
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
}

export default LifeEventSection
