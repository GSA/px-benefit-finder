import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a functional component that renders an svg image
 * @component
 * @return {html} returns a semantic svg element
 */
const Carrot = ({ color }) => {
  const svg = (
    <svg
      className="carrot"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      fill={color}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 10l5 5 5-5z" />
    </svg>
  )

  return svg
}

Carrot.propTypes = {
  color: PropTypes.string,
}

export default Carrot
