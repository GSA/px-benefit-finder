import PropTypes from 'prop-types'

const Alert = ({ children }) => {
  return (
    <div className="usa-alert usa-alert--info usa-alert--no-icon">
      <div className="usa-alert__body">
        <p className="usa-alert__text">{children}</p>
      </div>
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.string,
}

export default Alert
