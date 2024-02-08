import PropTypes from 'prop-types'

import './_index.scss'
/**
 * a functional component that wraps form elements in a form element
 * @component
 * @param {React.ReactNode} children - inherited children
 * @return {html} returns a semantic html form element, with all its children
 */
function Form({ children }) {
  return (
    <form className="benefit-form">
      <div className="benefit-contianer grid-container">{children}</div>
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node,
}

export default Form
