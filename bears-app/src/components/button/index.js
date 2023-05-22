import './index.scss'

function Button({ children, onClick, className }) {
  const handleClassName =
    className !== undefined ? `usa-button ${className}` : 'usa-button'

  return (
    <button onClick={onClick} className={handleClassName}>
      {children}
    </button>
  )
}

export default Button
