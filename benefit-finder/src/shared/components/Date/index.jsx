import PropTypes from 'prop-types'
// import parseDate from '../../utils/parseDate'
import './_index.scss'

/**
 * a parse our date object
 * @component
 * @param {func} onChange - inherited change handler
 * @param {string} required - inherited string value to manage required state
 * @param {object} value - inherited state values
 * @return {Date} returns a tandard format Date ie 1995-12-17T03:24:00
 */
const Date = ({ onChange, value, required, ui }) => {
  const { date, select } = ui
  const { labelDay, labelMonth, labelYear, monthOptions } = date
  const { dateDefaultValue } = select

  // Note: when we break each input into functional components they trigger unwanted rerenders

  return (
    <div className="usa-memorable-date">
      <div className="usa-form-group usa-form-group--month usa-form-group--select">
        <label className="usa-label" htmlFor="date_of_birth_month">
          {labelMonth}
        </label>
        <div id="month-description" className="a11y-sr-only">
          Select a month from the list
        </div>
        <select
          className={`usa-select ${
            required === 'TRUE' ? 'required-field' : ''
          }`}
          id="date_of_birth_month"
          name="date_of_birth_month"
          aria-describedby="month-description"
          required="required"
          value={(value && value.month) || ''}
          onChange={onChange}
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
      <div className="usa-form-group usa-form-group--day">
        <label className="usa-label" htmlFor="date_of_birth_day">
          {labelDay}
        </label>
        <div id="day-description" className="a11y-sr-only">
          Enter numerals for day
        </div>
        <input
          className={`usa-input ${required === 'TRUE' ? 'required-field' : ''}`}
          aria-describedby="day-description"
          id="date_of_birth_day"
          name="date_of_birth_day"
          inputMode="numeric"
          value={(value && value.day) || ''}
          onChange={onChange}
        />
      </div>
      <div className="usa-form-group usa-form-group--year">
        <label className="usa-label" htmlFor="date_of_birth_year">
          {labelYear}
        </label>
        <div id="year-description" className="a11y-sr-only">
          Enter numerals for year
        </div>
        <input
          className={`usa-input ${required === 'TRUE' ? 'required-field' : ''}`}
          aria-describedby="year-description"
          id="date_of_birth_year"
          name="date_of_birth_year"
          inputMode="numeric"
          value={(value && value.year) || ''}
          onChange={onChange}
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
