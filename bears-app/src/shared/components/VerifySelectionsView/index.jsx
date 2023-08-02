import PropTypes from 'prop-types'
import { Heading, Button } from '../index'

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
  props: PropTypes.any,
}

export default VerifySelectionsView
