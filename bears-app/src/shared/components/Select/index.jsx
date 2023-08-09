import { Label } from '../index'
import PropTypes from 'prop-types'
/**
 * a functional component to create a select from a list of options
 * @component
 * @param {string} label - The inherited options object of value and label
 * @param {string} htmlFor - The inherited component id that the label is for
 * @param {array} options - The inherited options array of objects with value and label keys
 * @return {html} returns a semantic html select element with options
 */
function Select({ label, htmlFor, options, defaultValue, onChange }) {
  /**
   * a functional component to create a list of options for a select element.
   * @function
   * @param {array} options - The inherited options objects of value and label
   * @return {html} returns a semantic html option(s)
   */
  const Options = ({ options }) => {
    return options.map(option => {
      return (
        <option
          value={option.value}
          key={option.value}
          selected={option.value === defaultValue}
        >
          {option.value}
        </option>
      )
    })
  }

  return (
    <>
      <Label label={label} htmlFor={htmlFor} />
      <select
        className="usa-select"
        name={htmlFor}
        id={htmlFor}
        onChange={onChange}
      >
        <Options options={options} />
      </select>
    </>
  )
}

Select.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  options: PropTypes.array,
}

export default Select
