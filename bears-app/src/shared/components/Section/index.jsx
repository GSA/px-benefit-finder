import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, StepIndicator, Modal } from '../index'
import './_index.scss'

const Section = ({ step, setStep, data, setStepData }) => {
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
      <h2>{step}</h2>
      <StepIndicator
        current={step - 1}
        setCurrent={setStep}
        data={data}
        onClick={handleUpdate}
      />
      <Button onClick={() => handleUpdate(-1)}>Backwards</Button>
      {modal === false ? (
        <Button onClick={() => handleUpdate(1)}>Forward</Button>
      ) : (
        <Modal
          id="nav-modal"
          modalHeading="Select an option:"
          navItemOneLabel="Verify Information"
          navItemTwoLabel="View Results"
          triggerLabel="Continue"
        />
      )}
    </div>
  )
}

Section.propTypes = {
  props: PropTypes.any,
}

export default Section
