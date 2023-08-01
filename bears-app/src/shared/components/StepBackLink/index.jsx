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
  return (
    <Button
      className="step-back-link"
      unstyled
      onClick={() => setCurrent(currentIndex)}
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
