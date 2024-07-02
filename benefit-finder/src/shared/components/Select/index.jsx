import PropTypes from 'prop-types'
import { useHandleClassName } from '../../hooks'
import { Label } from '../index'
import './_index.scss'

/**
 * a functional component to create a select from a list of options
 * @component
 * @param {string} label - The inherited options object of value and label
 * @param {string} htmlFor - The inherited component id that the label is for
 * @param {array} options - The inherited options array of objects with value and label keys
 * @param {string} selected - The inherited selected value
 * @param {function} onChange - The inherited onChange handler
 * @param {object} ui - The inherited object for ui translations
 * @param {string} className - inherited class string
 * @param {boolean} invalid - state of validity passed from handler
 * @return {html} returns a semantic html select element with options
 */
function Select({
  label,
  htmlFor,
  options,
  selected,
  onChange,
  ui,
  className,
  invalid,
}) {
  const { labelSelect, defaultValue } = ui
  const defaultClasses = [
    `bf-usa-select usa-select ${invalid === true ? 'usa-input--error' : ''}`,
  ]
  /**
   * a functional component to create a list of options for a select element.
   * @function
   * @param {array} options - The inherited options objects of value and label
   * @return {html} returns a semantic html option(s)
   */
  const Options = ({ options }) => {
    return options.map(option => {
      return (
        <option value={option.value} key={option.value}>
          {option.value}
        </option>
      )
    })
  }

  return (
    <>
      <Label label={label || labelSelect} htmlFor={htmlFor} />
      <select
        className={useHandleClassName({
          className,
          defaultClasses,
        })}
        name={htmlFor}
        id={htmlFor}
        onChange={onChange}
        value={selected || ''}
        aria-invalid={invalid === true}
      >
        <option value="" key="default" disabled>
          {defaultValue}
        </option>
        <Options options={options} />
      </select>
    </>
  )
}

Select.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  ui: PropTypes.object,
  className: PropTypes.string,
  invalid: PropTypes.bool,
}

export default Select
