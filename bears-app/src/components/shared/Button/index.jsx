import PropTypes from 'prop-types'

import './index.scss'

/**
 * a functional component that renders a reactive button
 * @component
 * @param {React.ReactNode} children - inherited children
 * @param {string} className - inherited class(es)
 * @param {function} onClick - an inherited function, triggered on a click event
 * @return {html} returns a semantic html button element
 */
function Button({ children, className, onClick }) {
  /**
   * a function to construct class strings based on composition.
   * @function
   * @param {string} className - The inherited class
   * @return {string} returns a concat string
   */
  const handleClassName =
    className !== undefined ? `usa-button ${className}` : 'usa-button'

  return (
    <button onClick={onClick} className={handleClassName}>
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
