import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a functional component that renders a div and expects a string description of time
 * @component
 * @param {string} timeEstimate - The inherited value for time description
 * @return {html} returns a div
 */
const TimeIndicator = ({ timeEstimate }) => {
  return <div className="time-indicator">Time to complete: {timeEstimate}</div>
}

TimeIndicator.propTypes = {
  timeEstimate: PropTypes.string,
}

export default TimeIndicator
