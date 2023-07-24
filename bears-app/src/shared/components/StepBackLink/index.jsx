import PropTypes from 'prop-types'
import { Button } from '../index'
import './_index.scss'

const StepBackLink = ({ setCurrent, currentIndex }) => {
  const handleBack = (setCurrent, currentIndex) => {
    currentIndex === 0 ? setCurrent(0) : setCurrent(currentIndex - 1)
  }

  return (
    <Button
      className="step-back-link"
      unstyled
      onClick={() => handleBack(setCurrent, currentIndex)}
    >
      Back
    </Button>
  )
}

StepBackLink.propTypes = {
  setCurrent: PropTypes.func,
  currentIndex: PropTypes.number,
}

export default StepBackLink
