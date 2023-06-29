import './_index.scss'
/**
 * a functional component that renders a string
 * @component
 * @return {html} returns a div
 */
const Hint = () => {
  return (
    <span title="required" className="usa-hint usa-hint--required required">
      (Required)
    </span>
  )
}

export default Hint
