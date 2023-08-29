/**
 * an async fetch to get life-event data.
 * @function
 * @param {string} lifeEvent - The inherited class from
 * @return {JSON || Sring} returns JSON data if succesfull
 */
export async function GETLifeEvent(lifeEvent) {
  let language
  // get life-event from location
  if (lifeEvent === undefined) {
    const string = /^\/es/
    language = string.test(window.location.pathname) ? 'es_' : ''
    const location = window.location.pathname
    lifeEvent = location.substring(location.lastIndexOf('/') + 1)
  }
  const response = await fetch(
    `/sites/default/files/bears/api/life_event/${language}${lifeEvent}.json`
  )
    .then(response => {
      if (response?.ok) {
        return response.json()
      }
      throw new Error(response?.status)
    })
    .then(responseJson => {
      return responseJson?.data ? responseJson : 'Something went wrong.'
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error)
      return 'Something went wrong.'
    })
  return response
}

// handlers
/**
 * a function that determines the prefix of our URL
 * based on a string match in the pathname of the window object
 * @function
 */
export const GETLanguage = () => {
  const string = /^\/es/
  return string.test(window.location.pathname) ? 'es' : 'en'
}

/**
 * a function to get the value object of selected fieldset values
 * @function
 * @param {object} item - fieldset object
 * @return {object} returns the object with a selected key
 */
export const GETSelectedValue = item =>
  item &&
  item.fieldset.inputs[0].inputCriteria.values.find(value => value.selected)

/**
 * a function to get array of children
 * @function
 * @param {object} item - parent fieldset object
 * @return {array} returns an array of children related to the param
 */
export const GETChildren = item =>
  item && item.fieldset?.children.map(childItem => childItem.fieldsets[0])

export const GETSelectedValueAll = data =>
  data &&
  data
    .flatMap((item, i) =>
      item.section.fieldsets.flatMap(item => {
        const selected = GETSelectedValue(item)
        return (
          selected && [
            {
              criteriaKey: item.fieldset.inputs[0].inputCriteria.id,
              values: selected,
            },
            GETChildren(item) &&
              GETChildren(item)
                .flatMap(
                  childItem =>
                    GETSelectedValue(childItem) && {
                      criteriaKey: childItem.fieldset.criteriaKey,
                      values: GETSelectedValue(childItem),
                    }
                )
                .filter(element => element !== undefined),
          ]
        )
      })
    )
    .flat() // we flatten all to have only one array
    .filter(element => element !== undefined) // remove undefined

const handleDateEligibility = (conditional, selectedValue) => {
  // date values
  // "<01-01-1978"
  // "<2years (the deceased died within the last two years)"
  // "<18years"
  // ">=62years"
  // ">=60years"
  // ">=50years"
  // ">18years"

  // get the conditional
  const text = conditional
  const operators = /['>', '>=', '<', '<=', '=']/g
  const operator = text.match(operators)
  const integer = text.match(/\d+/)[0]

  // calculate back
  // get current date
  // subtract integer
  // if a date comes back in date format
  const pattern = /-/
  const conditionalDate = pattern.test(text)
    ? new window.Date(text)
    : new window.Date(
        new Date().getFullYear() - integer,
        new Date().getMonth(),
        new Date().getDate()
      )

  // getTime in milliseconds so we can do a comparison
  const epochConditionalDate = conditionalDate.getTime()

  // example selected value for date
  // const value = {
  //   year: 2022,
  //   month: 2,
  //   day: 2,
  // }

  // calculate selected
  const selectedDate = new window.Date(
    Date.UTC(selectedValue.year, selectedValue.month, selectedValue.day)
  )

  const epochSelectedDate = selectedDate.getTime()

  const isDateEligible = (
    operator,
    epochSelectedDate,
    epochConditionalDate
  ) => {
    // ;['>', '>=', '<', '<=', '=']
    switch (operator.length && operator.join('')) {
      case '>':
        return epochSelectedDate > epochConditionalDate
      case '>=':
        return epochSelectedDate >= epochConditionalDate
      case '<':
        return epochSelectedDate < epochConditionalDate
      case '<=':
        return epochSelectedDate <= epochConditionalDate
      case '=':
        return epochSelectedDate === epochConditionalDate
      default:
        return false
    }
  }
  return isDateEligible(operator, epochSelectedDate, epochConditionalDate)
}

export const GETElegibilityByCriteria = (selectedCriteria, data) => {
  // return all eligible items
  const eligibleItems =
    data &&
    data.map(item => {
      // find all eligibility items that are matches to criteria key
      selectedCriteria.forEach(selected => {
        // match item to criteria key
        const criteriaEligibility = item.benefit.eligibility.find(
          criteria => criteria.criteriaKey === selected.criteriaKey
        )

        // determine it's eligiblity
        if (criteriaEligibility !== undefined) {
          // look for eligible matches
          const isEligible = () => {
            let eligibility

            if (typeof selected.values.value === 'object') {
              eligibility = criteriaEligibility.acceptableValues.find(value =>
                handleDateEligibility(value, selected.values.value)
              )
            } else {
              eligibility = criteriaEligibility.acceptableValues.find(
                value => value === selected.values.value
              )
            }
            return eligibility
          }

          // undefined === false
          criteriaEligibility.isEligible = !!isEligible()
        }
      })
      return item
    })
  // merge all arrays and objects into one array
  const mergedEligibleItems = eligibleItems && [].concat(...eligibleItems)
  return mergedEligibleItems
}

// export const GETElegibilityByLabel = (selectedCriteria, data, label) => {
//   // return all eligible items
//   const eligibleItems = GETElegibilityByCriteria(selectedCriteria, data)
//   console.log('eligibleItems', eligibleItems, label)
// }

/**
 * an async fetch to get life-event data.
 * @function
 * @param {string} lifeEvent - The inherited class from
 * @return {JSON || Sring} returns JSON data if succesfull
 */
export async function findCriteria(arr, criteriaKey) {
  let element

  element = arr.find(element => element.fieldset.criteriaKey === criteriaKey)

  // if the element returns as undefined, then go check for children
  if (element === undefined) {
    arr.forEach(item => {
      item.fieldset.children.forEach(childElement => {
        if (childElement.fieldsets[0].fieldset.criteriaKey === criteriaKey) {
          element = childElement.fieldsets[0]
        }
      })
    })
  }
  return element
}

/**
 * an async fetch to get life-event data.
 * @function
 * @param {string} criteriaKey
 * @param {object} currentData
 * @param {function} setCurrentData
 * @param {string} eventTargetValue
 * @return {JSON || Sring} returns JSON data if succesfull
 */
export async function PUTData(
  criteriaKey,
  currentData,
  setCurrentData,
  eventTargetValue
) {
  // copy current data state
  const newData = { ...currentData }

  findCriteria(newData.section.fieldsets, criteriaKey)
    .then(foundCriteria => {
      if (foundCriteria) {
        const inputValues =
          foundCriteria.fieldset?.inputs[0].inputCriteria.values

        inputValues.forEach(value => {
          if (value.value === eventTargetValue) {
            value.selected = true
          } else {
            delete value.selected
          }
        })
        return setCurrentData(newData)
      }
      throw new Error('No criteria found.')
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error)
      return 'Something went wrong.'
    })
}

/**
 * an async fetch to get life-event data.
 * @function
 * @param {string} criteriaKey
 * @param {object} currentData
 * @param {function} setCurrentData
 * @param {string} eventTargetValue
 * @param {string} eventTargetID
 * @return {JSON || Sring} returns JSON data if succesfull
 */
export async function PUTDataDate(
  criteriaKey,
  currentData,
  setCurrentData,
  eventTargetValue,
  eventTargetID
) {
  // copy current data state
  const newData = { ...currentData }

  findCriteria(newData.section.fieldsets, criteriaKey)
    .then(foundCriteria => {
      if (foundCriteria) {
        const inputValues =
          foundCriteria.fieldset?.inputs[0].inputCriteria.values

        if (eventTargetID.includes('day')) {
          inputValues[0].value.day = eventTargetValue
        }
        if (eventTargetID.includes('month')) {
          inputValues[0].value.month = eventTargetValue
        }
        if (eventTargetID.includes('year')) {
          inputValues[0].value.year = eventTargetValue
        }

        inputValues[0].value = { ...inputValues[0].value }
        inputValues[0].selected = true
        return setCurrentData(newData)
      }
      throw new Error('Date not updated.')
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error)
      return 'Something went wrong.'
    })
}
