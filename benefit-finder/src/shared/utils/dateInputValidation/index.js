const dateInputValidation = event => {
  console.log(event)
  if (/^[0-9]*$/.test(`${event.target.value}`)) {
    if (event.target.id.includes('day')) {
      if (event.target.value.length === 2) {
        const range = /^(0?[1-9]|[12][0-9]|3[01])$/
        return range.test(`${event.target.value}`)
      }
      return event.target.value.length < 3
    }
    if (event.target.id.includes('year')) {
      const currentYear = new Date().getFullYear().toString()
      const yearLimit = currentYear.substring(currentYear.length - 1)
      if (event.target.value.length === 4) {
        // 1900 - currentyear
        const range = new RegExp(
          `^(19[0-9][0-9]|20[0-1][0-9]|20[0-2][0-${yearLimit}])$`
        )
        return range.test(`${event.target.value}`)
      }
      return event.target.value.length < 5
    }
  }

  if (event.target.id.includes('month')) {
    return event.target.value.length >= 1
  }
}

export default dateInputValidation
