import PropTypes from 'prop-types'
import { useHandleClassName } from '../../hooks'
import './_index.scss'

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
  hasError,
  noBackground,
  tabIndex,
  ariaHidden,
}) => {
  const defaultClasses = error
    ? [
        'bf-usa-alert',
        'usa-alert',
        'bf-usa-alert--error',
        'usa-alert--error',
        'display-none',
      ]
    : [
        'bf-usa-alert',
        'usa-alert',
        'bf-usa-alert--info',
        'usa-alert--info',
        `${noBackground ? 'no-background' : ''}`,
      ]

  return (
    <div
      className={useHandleClassName({ className, defaultClasses })}
      role="alert"
      ref={alertFieldRef}
      tabIndex={tabIndex || 0}
      aria-live={hasError === true ? 'assertive' : 'polite'}
      aria-hidden={ariaHidden || !hasError}
    >
      {children ? (
        <div className="bf-usa-alert__body usa-alert__body">
          <div className="bf-usa-alert__text usa-alert__text">{children}</div>
        </div>
      ) : (
        <div className="bf-usa-alert__body usa-alert__body">
          <h4 className="bf-usa-alert__heading usa-alert__heading">
            {heading}
          </h4>
          <p className="bf-usa-alert__text usa-alert__text">{description}</p>
        </div>
      )}
    </div>
  )
}

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  alertFieldRef: PropTypes.any,
  heading: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.bool,
}

export default Alert
