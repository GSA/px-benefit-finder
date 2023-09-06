import { useHandleClassName } from '../../hooks/useHandleClassName'
import PropTypes from 'prop-types'

/**
 * a functional component to create a label for inputs.
 * @function
 * @param {string} label - The inherited lable value
 * @param {string} htmlFor - The inherited component id that the label is related to
 * @return {html} returns a semantic html label
 */
const Label = ({ className, label, htmlFor }) => {
  const defaultClasses = ['usa-label']
  return (
    <label
      className={useHandleClassName({ className, defaultClasses })}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  )
}

Label.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  htmlFor: PropTypes.string,
}

export default Label
