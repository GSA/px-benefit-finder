import PropTypes from 'prop-types'
import { Alert } from '../index'
import './_index.scss'

/**
 * a parse our date object
 * @component
 * @param {func} onChange - inherited change handler
 * @param {string} required - inherited string value to manage required state
 * @param {object} value - inherited state values
 * @return {Date} returns a tandard format Date ie 1995-12-17T03:24:00
 */
const Date = ({ onChange, value, required, ui, id, invalid }) => {
  const { date, select } = ui
  const { labelDay, labelMonth, labelYear, monthOptions, alert } = date
  const { dateDefaultValue } = select

  // Note: when we break each input into functional components they trigger unwanted rerenders

  return (
    <div
      id={`bf-usa-memorable-date-${id} usa-memorable-date-${id}`}
      className="bf-usa-memorable-date usa-memorable-date"
    >
      {invalid === true && (
        <Alert
          className="bf-usa-date-alert"
          heading={ui.alertBanner.heading}
          description={alert}
          error
          hasError={invalid}
        ></Alert>
      )}
      <div className="bf-usa-form-group usa-form-group bf-usa-form-group--month usa-form-group--month bf-usa-form-group--select usa-form-group--select">
        <label
          className="bf-usa-label usa-label"
          htmlFor={`date_of_birth_month-${id}`}
        >
          {labelMonth}
        </label>
        <div id={`month-description-${id}`} className="usa-sr-only">
          Select a month from the list
        </div>
        <select
          className={`bf-usa-select usa-select ${
            required === 'TRUE' ? 'required-field' : ''
          }`}
          id={`date_of_birth_month-${id}`}
          name={`date_of_birth_month-${id}`}
          aria-describedby={`month-description-${id}`}
          required={required === 'TRUE'}
          value={(value && value.month) || ''}
          onChange={onChange}
          aria-invalid={invalid === true}
        >
          <option value="" key="default" disabled>
            {dateDefaultValue}
          </option>
          {monthOptions.map((option, i) => (
            <option value={i} key={`${option.label}-${i}`}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="bf-usa-form-group usa-form-group bf-usa-form-group--day usa-form-group--day">
        <label
          className="bf-usa-label usa-label"
          htmlFor={`date_of_birth_day-${id}`}
        >
          {labelDay}
        </label>
        <div id={`day-description-${id}`} className="usa-sr-only">
          Enter two numerals for day
        </div>
        <input
          className={`bf-usa-input usa-input ${required === 'TRUE' ? 'required-field' : ''}`}
          aria-describedby={`day-description-${id}`}
          id={`date_of_birth_day-${id}`}
          name={`date_of_birth_day-${id}`}
          inputMode="numeric"
          value={(value && value.day) || ''}
          onChange={onChange}
          required={required === 'TRUE'}
          aria-invalid={invalid === true}
        />
      </div>
      <div className="bf-usa-form-group usa-form-group bf-usa-form-group--year usa-form-group--year">
        <label
          className="bf-usa-label usa-label"
          htmlFor={`date_of_birth_year-${id}`}
        >
          {labelYear}
        </label>
        <div id={`year-description-${id}`} className="usa-sr-only">
          Enter four numerals for year
        </div>
        <input
          className={`bf-usa-input usa-input ${required === 'TRUE' ? 'required-field' : ''}`}
          aria-describedby={`year-description-${id}`}
          id={`date_of_birth_year-${id}`}
          name={`date_of_birth_year-${id}`}
          inputMode="numeric"
          value={(value && value.year) || ''}
          onChange={onChange}
          required={required === 'TRUE'}
          aria-invalid={invalid === true}
        />
      </div>
    </div>
  )
}

Date.propTypes = {
  onChange: PropTypes.func,
  required: PropTypes.string,
  value: PropTypes.object,
}

export default Date
