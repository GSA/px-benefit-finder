import './_index.scss'
/**
 * a functional component that renders a string
 * @component
 * @return {html} returns a div
 */
const Hint = ({ requiredLabel }) => {
  return (
    <span title="required" className="usa-hint usa-hint--required required">
      {`(${requiredLabel?.value} || Required)`}
    </span>
  )
}

export default Hint
