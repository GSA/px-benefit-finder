import PropTypes from 'prop-types'
import parseDate from '../../utils/parseDate'
import { useHandleClassName } from '../../hooks/useHandleClassName'
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

  // date input values
  // if no value is inherited create a new value
  // or
  // if a value is inherited as an object, return the value
  // or
  // if there is no value, default to an empty string
  // in the case of date we wait until the value from onChange is a 4 digit value
  const monthValue =
    new window.Date(parseDate(value)).getMonth() || (value && value.month) || ''

  const dayValue =
    new window.Date(parseDate(value)).getDate() || (value && value.day) || ''

  const yearValue =
    (value?.year?.length === 4 &&
      new window.Date(parseDate(value)).getFullYear()) ||
    (value && value.year) ||
    ''

  const handleRequired = required === 'TRUE' ? ['required-field'] : ''

  const MonthSelect = ({ className }) => {
    const defaultClasses = ['usa-select']
    const utilityClasses = handleRequired
    return (
      <div className="usa-form-group usa-form-group--month usa-form-group--select">
        <label className="usa-label" htmlFor="date_of_birth_month">
          {labelMonth}
        </label>
        <select
          className={useHandleClassName({
            className,
            defaultClasses,
            utilityClasses,
          })}
          id="date_of_birth_month"
          name="date_of_birth_month"
          aria-describedby="mdHint"
          required="required"
          value={monthValue}
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
    )
  }

  const DayInput = ({ className }) => {
    const defaultClasses = ['usa-input']
    const utilityClasses = handleRequired
    return (
      <div className="usa-form-group usa-form-group--day">
        <label className="usa-label" htmlFor="date_of_birth_day">
          {labelDay}
        </label>
        <input
          className={useHandleClassName({
            className,
            defaultClasses,
            utilityClasses,
          })}
          aria-describedby="mdHint"
          id="date_of_birth_day"
          name="date_of_birth_day"
          maxLength="2"
          pattern="[0-9]*"
          inputMode="numeric"
          value={dayValue}
          onChange={onChange}
        />
      </div>
    )
  }

  const YearInput = ({ className }) => {
    const defaultClasses = ['usa-input']
    const utilityClasses = handleRequired
    return (
      <div className="usa-form-group usa-form-group--year">
        <label className="usa-label" htmlFor="date_of_birth_year">
          {labelYear}
        </label>
        <input
          className={useHandleClassName({
            className,
            defaultClasses,
            utilityClasses,
          })}
          aria-describedby="mdHint"
          id="date_of_birth_year"
          name="date_of_birth_year"
          minLength="4"
          maxLength="4"
          pattern="[0-9]*"
          inputMode="numeric"
          value={yearValue}
          onChange={onChange}
        />
      </div>
    )
  }

  return (
    <div className="usa-memorable-date">
      <MonthSelect />
      <DayInput />
      <YearInput />
    </div>
  )
}

Date.propTypes = {
  onChange: PropTypes.func,
  required: PropTypes.string,
  value: PropTypes.object,
}

export default Date
