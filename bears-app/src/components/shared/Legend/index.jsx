import PropTypes from 'prop-types'

const Legend = ({ children }) => {
  return <legend className="usa-legend">{children}</legend>
}

Legend.propTypes = {
  children: PropTypes.string,
}

export default Legend
