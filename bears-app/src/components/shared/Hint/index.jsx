import PropTypes from 'prop-types'

const Hint = ({ children }) => {
  return <div>{children}</div>
}

Hint.propTypes = {
  children: PropTypes.string,
}

export default Hint
