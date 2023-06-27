import { useHandleClassName } from '../hooks/useHandleClassName'
import PropTypes from 'prop-types'

/**
 * a functional component that renders a reactive button
 * @component
 * @param {React.ReactNode} children - inherited children
 * @param {string} className - inherited class(es)
 * @param {boolean} secondary - alternative display styles
 * @param {boolean} disabled - disabled state
 * @param {function} onClick - an inherited function, triggered on a click event
 * @return {html} returns a semantic html button element
 */

function Button({ children, className, onClick, secondary, disabled, type }) {
  const defaultClasses = !secondary
    ? ['usa-button']
    : ['usa-button', 'usa-button--outline']

  return (
    <button
      onClick={disabled ? null : onClick}
      type={type || 'button'}
      disabled={disabled}
      aria-disabled={disabled}
      className={useHandleClassName({
        className,
        defaultClasses,
      })}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'download']),
}

export default Button
