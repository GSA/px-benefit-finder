/**
 * a parse our date object
 * @function
 * @param {object} value - { day, month, year }
 * @return {Date} returns a tandard format Date ie 1995-12-17T03:24:00
 */
const parseDate = value => {
  const d =
    value && new window.Date(Date.UTC(value.year, value.month, value.day))
  return d
}

export default parseDate
