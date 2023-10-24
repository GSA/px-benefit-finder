import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a functional component that renders an svg image
 * @component
 * @return {html} returns a semantic svg element
 */
const Carrot = ({ color, type }) => {
  const svg1 = (
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

  const svg2 = (
    <svg
      className="carrot-two"
      width="13"
      height="22"
      viewBox="0 0 13 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.18079 1.18074C2.79027 0.790216 2.1571 0.790215 1.76658 1.18074L0.706337 2.24098C0.316114 2.6312 0.315768 3.26377 0.705565 3.65442L7.33029 10.2936C7.71979 10.684 7.71979 11.3159 7.33029 11.7063L0.705566 18.3455C0.315768 18.7361 0.316113 19.3687 0.706336 19.7589L1.76658 20.8192C2.1571 21.2097 2.79027 21.2097 3.18079 20.8192L12.2929 11.7071C12.6834 11.3165 12.6834 10.6834 12.2929 10.2928L3.18079 1.18074Z"
        fill="#162E51"
      />
    </svg>
  )

  const svg = type === 2 ? svg2 : svg1

  return svg
}

Carrot.propTypes = {
  color: PropTypes.string,
  type: PropTypes.number,
}

export default Carrot
