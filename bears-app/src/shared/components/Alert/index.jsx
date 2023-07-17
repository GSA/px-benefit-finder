import PropTypes from 'prop-types'
import { useHandleClassName } from '../../hooks/useHandleClassName'

/**
 * a functional component that renders an information alert
 * @component
 * @param {string} className - inherited classes
 * @param {string} children - inherited children
 * @return {html} returns a wrapped paragraph
 */

const Alert = ({ className, children }) => {
  const defaultClasses = ['usa-alert', 'usa-alert--info']

  return (
    <div className={useHandleClassName({ className, defaultClasses })}>
      <div className="usa-alert__body">
        <p className="usa-alert__text">{children}</p>
      </div>
    </div>
  )
}

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
}

export default Alert
