import PropTypes from 'prop-types'
import { Heading } from '../index'
import { useHandleClassName } from '../../hooks'
import './_index.scss'

/**
 * a functional component that renders an information alert
 * @component
 * @param {string} className - inherited classes
 * @param {string} children - inherited children
 * @param {any} alertFieldRef - inherited ref hook
 * @param {obj} heading - inherited heading, contains prefix and suffix
 * @param {string} description - inherited description
 * @param {bool} type - string
 * @param {bool}  hasError - checks for current error state of parent value
 * @param {number} errorCount - number of errors in the view
 * @param {array} errorList - array of error ids and label values
 * @param {bool} noBackground - style variant
 * @param {number} tabIndex - index value of tab order
 * @return {html} returns a wrapped paragraph styled as usa-alert
 */

const Alert = ({
  className,
  children,
  alertFieldRef,
  heading,
  description,
  type,
  hasError,
  noBackground,
  tabIndex,
  errorCount,
  errorList,
}) => {
  const defaultClasses =
    type === 'error'
      ? [
          'bf-usa-alert',
          'usa-alert',
          'bf-usa-alert--error',
          'usa-alert--error',
          `${hasError === false ? 'display-none' : ''}`,
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
      aria-hidden={hasError === undefined ? false : !hasError}
    >
      {children ? (
        <div className="bf-usa-alert__body usa-alert__body">
          <div className="bf-usa-alert__text usa-alert__text">{children}</div>
        </div>
      ) : (
        <div className="bf-usa-alert__body usa-alert__body">
          <Heading
            headingLevel={2}
            className="bf-usa-alert__heading usa-alert__heading"
          >
            {heading?.prefix}&nbsp;{errorCount}&nbsp;{heading?.suffix}
          </Heading>
          <p className="bf-usa-alert__text usa-alert__text">{description}</p>
          <ul data-testid="bf-errors-list">
            {/* TODO: get Labels */}
            {errorList &&
              errorList.map(item => {
                return (
                  <li key={item.id} data-testid="bf-errors-list-item">
                    <a href={`#${item.id}`}>
                      {item.getAttribute('aria-errormessage') || item.id}
                    </a>
                  </li>
                )
              })}
          </ul>
        </div>
      )}
    </div>
  )
}

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  alertFieldRef: PropTypes.any,
  heading: PropTypes.object,
  description: PropTypes.string,
  type: PropTypes.string,
  hasError: PropTypes.bool,
  noBackground: PropTypes.bool,
  tabIndex: PropTypes.number,
  errorCount: PropTypes.number,
}

export default Alert
