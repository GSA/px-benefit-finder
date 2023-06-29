import { Hint, Legend } from '../index'
import PropTypes from 'prop-types'

const Fieldset = ({ children, legend, hint }) => {
  return (
    <fieldset className="usa-fieldset">
      {legend && <Legend>{legend}</Legend>}
      {hint && <Hint>{hint}</Hint>}
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
