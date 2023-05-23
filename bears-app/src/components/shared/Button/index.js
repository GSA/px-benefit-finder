import './index.scss'

function Button({ children, onClick, className }) {
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
