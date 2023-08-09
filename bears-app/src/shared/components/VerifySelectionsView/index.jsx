import PropTypes from 'prop-types'
import { Heading, Button } from '../index'

/**
 * afunctional component that renders a view of the form input state values
 * @component
 * @param {function} handleStepForward - an array of sections
 * @param {function} handleStepBack - determinate to render headings or not
 * @param {objecti} ui - inherited state, indicates index value
 * @return {html} returns semantic html view for current input values
 */
const VerifySelectionsView = ({ handleStepForward, handleStepBack, ui }) => {
  const { heading, buttonGroup } = ui
  return (
    <div>
      <Heading headingLevel={2}>{heading}</Heading>
      <Button onClick={handleStepBack}>{buttonGroup[0].value}</Button>
      <Button onClick={handleStepForward}>{buttonGroup[1].value}</Button>
    </div>
  )
}

VerifySelectionsView.propTypes = {
  handleStepForward: PropTypes.func,
  handleStepBck: PropTypes.func,
  ui: PropTypes.object,
}

export default VerifySelectionsView
