import './index.scss'

/**
 * a functional component that renders a reactive button
 * @component
 * @param {object} children - inherited children
 * @param {string} className - inherited class(es)
 * @param {event} onClick - an inherited function, triggered on a click event
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

export default Button
