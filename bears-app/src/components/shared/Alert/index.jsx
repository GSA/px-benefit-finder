import PropTypes from 'prop-types'

/**
 * a functional component that renders an information alert
 * @component
 * @param {string} children - inherited children
 * @return {html} returns a wrapped paragraph
 */

const Alert = ({ children }) => {
  return (
    <div className="usa-alert usa-alert--info">
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
