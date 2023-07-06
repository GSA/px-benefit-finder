import { Hint, Legend } from '../index'
import PropTypes from 'prop-types'

/**
 * a functional component that renders a string
 * @component
 * @param {React.ReactNode} children - inherited children
 * @param {string} legend - passed to Legend component
 * @param {string} hint - passed to Hint component
 * @return {html} returns a div
 */

const Fieldset = ({ children, legend, required }) => {
  const RequiredFlag = () => (
    <>
      <Legend>
        {legend}
        <Hint />
      </Legend>
    </>
  )

  const handleRequired = !required ? <Legend>{legend}</Legend> : RequiredFlag()

  return (
    <fieldset className="usa-fieldset">
      {legend && handleRequired}
      {children}
    </fieldset>
  )
}

Fieldset.propTypes = {
  children: PropTypes.node,
  legend: PropTypes.string,
  hint: PropTypes.string,
}

export default Fieldset
