import PropTypes from 'prop-types'
import { Button } from '../index'
import './_index.scss'

/**
 * a functional component that supports backwards navigation in the step indicator component
 * @component
 * @param {function} setCurrent - inherited state function
 * @param {number} currentIndex - inherited current index state
 * @return {html} returns markup for a usa unstyled button
 */
const StepBackLink = ({ setCurrent, currentIndex }) => {
  /**
   * a handler that manages which index is updated on the click event
   * @function
   * @return {number} returns new index state for current
   */
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
