import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../index'
import './_index.scss'

/**
 * a functional component that supports backwards navigation in the step indicator component
 * @component
 * @param {React.ReactNode} children - inhertied child react nodes for label
 * @param {function} setCurrent - inherited state function
 * @param {number} currentIndex - inherited current index state
 * @return {html} returns markup for a usa unstyled button
 */
const StepBackLink = ({ children, setCurrent, currentIndex }) => {
  const tabbableElements = document.getElementsByClassName('usa-skipnav')
  const skipNav = useRef(tabbableElements[0])

  const handleStep = () => {
    setCurrent(currentIndex)
    skipNav && skipNav.current.focus()
  }

  return (
    <Button className="step-back-link" unstyled onClick={() => handleStep()}>
      {children || 'Back'}
    </Button>
  )
}

StepBackLink.propTypes = {
  children: PropTypes.node,
  setCurrent: PropTypes.func,
  currentIndex: PropTypes.number,
}

export default StepBackLink
