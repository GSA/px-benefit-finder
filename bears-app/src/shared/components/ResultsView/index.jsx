import PropTypes from 'prop-types'
import { Heading, StepBackLink } from '../index'

const ResultsView = ({ handleStepBack, ui }) => {
  const { heading, stepBackLink } = ui
  return (
    <div>
      <Heading headingLevel={2}>{heading}</Heading>
      <StepBackLink setCurrent={handleStepBack}>{stepBackLink}</StepBackLink>
    </div>
  )
}

ResultsView.propTypes = {
  props: PropTypes.any,
}

export default ResultsView
