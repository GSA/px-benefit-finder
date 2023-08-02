import PropTypes from 'prop-types'
import { Heading, StepBackLink } from '../index'

/**
 * a functional component that renders a view of the form state values
 * @component
 * @param {function} handlStepBack inherited ui translations
 * @param {object} ui inherited ui translations
 * @return {html} returns a view page of current selections
 */
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
  handleStepBack: PropTypes.func,
  ui: PropTypes.object,
}

export default ResultsView
