import { Label } from '../index'
import PropTypes from 'prop-types'

const Radio = ({ label, value, defaultChecked }) => {
  return (
    <>
      <div className="usa-radio">
        <input
          className="usa-radio__input"
          id={label}
          type="radio"
          name={label}
          value={value || label}
          defaultChecked={defaultChecked || false}
        />
        <Label className="usa-radio__label" htmlFor={label} label={label} />
      </div>
    </>
  )
}

Radio.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  defaultChecked: PropTypes.bool,
}

export default Radio
