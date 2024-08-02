import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a parse our date object
 * @component
 * @param {func} onChange - inherited change handler
 * @param {object} value - inherited state values
 * @param {object} ui - inherited ui object values
 * @param {string} errorMessage - inherited ui string value for custom error overrides
 * @param {string} parentLegend - inherited ui string values
 * @param {string} id - inherited string value for id specificity
 * @param {array} invalid - inherited boolean value to manage error state

 * @return {Date} returns a tandard format Date ie 1995-12-17T03:24:00
 */
const Date = ({
  onChange,
  value,
  ui,
  parentLegend,
  id,
  invalid,
  errorMessage,
}) => {
  const { date, select, errorText } = ui
  const { labelDay, labelMonth, labelYear, monthOptions } = date
  const { dateDefaultValue } = select
  const { suffix, prefix } = errorText

  // Note: when we break each input into functional components they trigger unwanted rerenders

  const handleInvalid = (invalidArray, id) => {
    return invalidArray && invalidArray.map(el => el.id === id).includes(true)
  }

  const errorMessages = {
    month: errorMessage
      ? `${errorMessage} : ${labelMonth.toLowerCase()}`
      : `${prefix} ${parentLegend?.toLowerCase()} ${labelMonth.toLowerCase()} ${suffix}`,
    day: errorMessage
      ? `${errorMessage} : ${labelDay.toLowerCase()}`
      : `${prefix} ${parentLegend?.toLowerCase()} ${labelDay.toLowerCase()} ${suffix}`,
    year: errorMessage
      ? `${errorMessage} : ${labelYear.toLowerCase()}`
      : `${prefix} ${parentLegend?.toLowerCase()} ${labelYear.toLowerCase()} ${suffix}`,
  }

  return (
    <>
      <ul className="add-list-reset">
        {handleInvalid(invalid, `date_of_birth_month-${id}`) && (
          <li
            id={`month-error-description-${id}`}
            className="bf-error-detail"
            aria-live="assertive"
          >
            {errorMessages.month}
          </li>
        )}
        {handleInvalid(invalid, `date_of_birth_day-${id}`) && (
          <li
            id={`day-error-description-${id}`}
            className="bf-error-detail"
            aria-live="assertive"
          >
            {errorMessages.day}
          </li>
        )}
        {handleInvalid(invalid, `date_of_birth_year-${id}`) && (
          <li
            id={`year-error-description-${id}`}
            className="bf-error-detail"
            aria-live="assertive"
          >
            {errorMessages.year}
          </li>
        )}
      </ul>
      <div
        id={`bf-usa-memorable-date-${id}`}
        className="bf-usa-memorable-date usa-memorable-date"
      >
        <div className="bf-usa-form-group usa-form-group bf-usa-form-group--month usa-form-group--month bf-usa-form-group--select usa-form-group--select">
          <label
            className="bf-usa-label usa-label"
            htmlFor={`${id}-date_of_birth_month`}
          >
            {labelMonth}
          </label>
          <div id={`${id}-month-description`} className="usa-sr-only">
            Select a month from the list
          </div>
          <select
            className={`bf-usa-select usa-select ${handleInvalid(invalid, `${id}-date_of_birth_month`) ? 'usa-input--error' : ''}`}
            id={`${id}-date_of_birth_month`}
            name={`${id}-date_of_birth_month`}
            aria-describedby={`${id}-month-description`}
            value={(value && value.month) || ''}
            onChange={onChange}
            aria-invalid={handleInvalid(invalid, `${id}-date_of_birth_month`)}
            data-errormessage={errorMessages.month}
            aria-errormessage={`month-error-description-${id}`}
            data-datetype="month"
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
            htmlFor={`${id}-date_of_birth_day`}
          >
            {labelDay}
          </label>
          <div id={`${id}-day-description`} className="usa-sr-only">
            Enter two numerals for day
          </div>
          <input
            className={`bf-usa-input usa-input ${handleInvalid(invalid, `${id}-date_of_birth_day`) ? 'usa-input--error' : ''}`}
            aria-describedby={`${id}-day-description`}
            id={`${id}-date_of_birth_day`}
            name={`${id}-date_of_birth_day`}
            inputMode="numeric"
            value={(value && value.day) || ''}
            onChange={onChange}
            aria-invalid={handleInvalid(invalid, `${id}-date_of_birth_day`)}
            data-errormessage={errorMessages.day}
            aria-errormessage={`day-error-description-${id}`}
            data-datetype="day"
          />
        </div>
        <div className="bf-usa-form-group usa-form-group bf-usa-form-group--year usa-form-group--year">
          <label
            className="bf-usa-label usa-label"
            htmlFor={`${id}-date_of_birth_year`}
          >
            {labelYear}
          </label>
          <div id={`${id}-year-description`} className="usa-sr-only">
            Enter four numerals for year
          </div>
          <input
            className={`bf-usa-input usa-input ${handleInvalid(invalid, `${id}-date_of_birth_year`) ? 'usa-input--error' : ''}`}
            aria-describedby={`${id}-year-description`}
            id={`${id}-date_of_birth_year`}
            name={`${id}-date_of_birth_year`}
            inputMode="numeric"
            value={(value && value.year) || ''}
            onChange={onChange}
            aria-invalid={handleInvalid(invalid, `${id}-date_of_birth_year`)}
            data-errormessage={errorMessages.year}
            aria-errormessage={`year-error-description-${id}`}
            data-datetype="year"
          />
        </div>
      </div>
    </>
  )
}

Date.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  ui: PropTypes.object,
  id: PropTypes.string,
  invalid: PropTypes.array,
}

export default Date
