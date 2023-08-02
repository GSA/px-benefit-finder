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
}) => {
  const [modal, setModal] = useState(false)

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
      />
      <Button onClick={() => handleUpdate(-1)}>Back</Button>
      {modal === false ? (
        <Button onClick={() => handleUpdate(1)}>Continue</Button>
      ) : (
        <div>
          <Modal
            id="nav-modal"
            modalHeading="Select an option:"
            navItemOneLabel="Verify Information"
            navItemOneFunction={setVerifyStep}
            navItemTwoLabel="View Results"
            navItemTwoFunction={setViewResults}
            triggerLabel="Continue"
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
