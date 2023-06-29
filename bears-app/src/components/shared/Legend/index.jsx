import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a functional component that renders a string
 * @component
 * @param {string} children - inherited children
 * @return {html} returns a semantic legend element
 */
const Legend = ({ children }) => {
  return <legend className="usa-legend legend">{children}</legend>
}

Legend.propTypes = {
  children: PropTypes.string,
}

export default Legend
