import { useDesktop } from '../hooks/useBreakPoints'
import { useHandleClassName } from '../hooks/useHandleClassName'
import PropTypes from 'prop-types'

/**
 * a functional component that renders a reactive button
 * @component
 * @param {React.ReactNode} children - inherited children
 * @param {string} className - inherited class(es)
 * @param {function} onClick - an inherited function, triggered on a click event
 * @return {html} returns a semantic html button element
 */
function Button({ children, className, onClick, secondary }) {
  // these are temporary examples to demonstrate utility classes and props that change at our desktop breakpoint
  const desktop = useDesktop()
  const defaultClasses = !secondary
    ? ['usa-button', 'border-2px', 'border-accent-warm-light']
    : ['usa-button', 'usa-button--outline']
  const utilityClassesMobile = !secondary && ['bg-blue']
  const utilityClassesDesktop = !secondary && ['bg-orange']
  const utilityClasses = desktop ? utilityClassesDesktop : utilityClassesMobile

  return (
    <button
      onClick={onClick}
      className={useHandleClassName({
        className,
        defaultClasses,
        utilityClasses,
      })}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
