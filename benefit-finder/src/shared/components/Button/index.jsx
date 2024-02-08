import { useEffect, useState } from 'react'
import { useHandleClassName } from '../../hooks'
import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a functional component that renders a reactive button
 * @component
 * @param {React.ReactNode} children - inherited children
 * @param {string} className - inherited class(es)
 * @param {boolean} secondary - alternative display styles
 * @param {boolean} disabled - disabled state
 * @param {boolean} unstyled - appear as a link
 * @param {function} onClick - an inherited function, triggered on a click event
 * @return {html} returns a semantic html button element
 */

function Button({
  children,
  className,
  onClick,
  secondary,
  disabled,
  unstyled,
  type,
}) {
  const [defaultClasses, setDefaultClasses] = useState(null)
  const style =
    secondary === true ? 'secondary' : unstyled === true ? 'unstyled' : null

  useEffect(() => {
    switch (style) {
      case 'secondary':
        setDefaultClasses([
          'benefit-button',
          'usa-button',
          'benefit-button--outline',
          'usa-button--outline',
        ])
        break
      case 'unstyled':
        setDefaultClasses([
          'benefit-button',
          'usa-button',
          'benefit-button--unstyled',
          'usa-button--unstyled',
        ])
        break
      default:
        setDefaultClasses(['benefit-button', 'usa-button'])
    }
  }, [style, secondary, unstyled])

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
  unstyled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'download']),
}

export default Button
