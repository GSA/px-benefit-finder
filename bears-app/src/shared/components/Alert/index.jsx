import PropTypes from 'prop-types'
import { useHandleClassName } from '../../hooks/useHandleClassName'

/**
 * a functional component that renders an information alert
 * @component
 * @param {string} className - inherited classes
 * @param {string} children - inherited children
 * @param {any} alertFieldRef - inherited ref hook
 * @param {string} heading - inherited heading
 * @param {string} description - inherited description
 * @param {bool} error - variant
 * @return {html} returns a wrapped paragraph styled as usa-alert
 */

const Alert = ({
  className,
  children,
  alertFieldRef,
  heading,
  description,
  error,
}) => {
  const defaultClasses = error
    ? ['usa-alert', 'usa-alert--error', 'display-none']
    : ['usa-alert', 'usa-alert--info']

  return (
    <div
      className={useHandleClassName({ className, defaultClasses })}
      role="alert"
      ref={alertFieldRef}
    >
      {children ? (
        <div className="usa-alert__body">
          <p className="usa-alert__text">{children}</p>
        </div>
      ) : (
        <div className="usa-alert__body">
          <h4 className="usa-alert__heading">{heading}</h4>
          <p className="usa-alert__text">{description}</p>
        </div>
      )}
    </div>
  )
}

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  alertFieldRef: PropTypes.any,
  heading: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.bool,
}

export default Alert
