import { useResetElement } from '../../hooks'
import PropTypes from 'prop-types'
import { Button } from '@components'

import './_index.scss'

/**
 * a functional component that supports backwards navigation in the step indicator component
 * @component
 * @param {React.ReactNode} children - inhertied child react nodes for label
 * @param {function} setCurrent - inherited state function
 * @param {number} currentIndex - inherited current index state
 * @return {html} returns markup for a usa unstyled button
 */
const StepBackButton = ({ children, setCurrent, currentIndex }) => {
  const resetElement = useResetElement()

  const handleStep = () => {
    setCurrent(currentIndex)
    resetElement.current.focus()
  }

  return (
    <Button
      className="bf-step-back-button"
      unstyled
      onClick={() => handleStep()}
    >
      {children || 'Back'}
    </Button>
  )
}

StepBackButton.propTypes = {
  children: PropTypes.node,
  setCurrent: PropTypes.func,
  currentIndex: PropTypes.number,
}

export default StepBackButton
