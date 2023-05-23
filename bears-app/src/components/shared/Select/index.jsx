/**
 * a functional component to create a select from a list of options
 * @component
 * @param {string} label - The inherited options object of value and label
 * @param {string} htmlFor - The inherited component id that the label is for
 * @param {array} options - The inherited options array of objects with value and label keys
 * @return {html} returns a semantic html select element with options
 */
function Select({ label, htmlFor, options }) {
  /**
   * a functional component to create a label for options.
   * @function
   * @param {string} label - The inherited lable value
   * @param {string} htmlFor - The inherited component id that the label is related to
   * @return {html} returns a semantic html label
   */
  const Label = ({ label }) => {
    return (
      <label className="usa-label" htmlFor={htmlFor}>
        {label}
      </label>
    )
  }

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
          {option.label}
        </option>
      )
    })
  }

  return (
    <>
      <Label label={label} />
      <select className="usa-select" name={htmlFor} id={htmlFor}>
        <Options options={options} />
      </select>
    </>
  )
}

export default Select
