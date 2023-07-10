import PropTypes from 'prop-types'
import './_index.scss'

const TimeIndicator = ({ timeEstimate }) => {
  return <div className="time-indicator">Time to complete: {timeEstimate}</div>
}

TimeIndicator.propTypes = {
  timeEstimate: PropTypes.string,
}

export default TimeIndicator
