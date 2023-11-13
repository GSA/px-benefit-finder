/**
 *
 * UTILS FUNCTIONS
 *
 */

/**
 * a function that breaks down a conditional string and compares to a date epoch
 * @function
 * @param {string} conditional - one of >,>=,<,<=,= and a time value
 * @param {object} selectedValue - date object
 * @return {boolean} true or false based on the conditional
 */
export const DateEligibility = ({ selectedValue, conditional }) => {
  // console.log({ selectedValue, conditional })
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

  // example selected value for date
  // const value = {
  //   year: 2022,
  //   month: 2,(month index)
  //   day: 2,
  // }

  // calculate selected
  const selectedDate = new window.Date(
    Date.UTC(
      selectedValue.year,
      selectedValue.month,
      selectedValue.day,
      0,
      0,
      0
    )
  )

  const isDateEligible = (operator, conditionalDate, selectedDate) => {
    // ['>', '>=', '<', '<=', '=']
    // epoch time measures the number of seconds that have elapsed since the start of the Unix epoch on January 1st, 1970, at midnight UTC/GMT, minus the leap seconds.

    const x = selectedDate
    const y = new window.Date(
      Date.UTC(
        conditionalDate.getUTCFullYear(),
        conditionalDate.getUTCMonth(),
        conditionalDate.getUTCDate(),
        0,
        0,
        0
      )
    )

    if (pattern.test(text) === false) {
      const diff = y.getTime() - x.getTime()

      switch (operator.length && operator.join('')) {
        case '>':
          return diff > 0
        case '>=':
          return diff >= 0
        case '<':
          return diff < 0
        case '<=':
          return diff <= 0
        case '=':
          return +diff === 0
        default:
          return false
      }
    } else {
      switch (operator.length && operator.join('')) {
        case '>':
          return x.getTime() > y.getTime()
        case '>=':
          return x.getTime() >= y.getTime()
        case '<':
          return x.getTime() < y.getTime()
        case '<=':
          return x.getTime() <= y.getTime()
        case '=':
          return +x.getTime() === +y.getTime()
        default:
          return false
      }
    }
  }
  return isDateEligible(operator, conditionalDate, selectedDate)
}

/**
 * a function that searches an array for element or child element match to a key
 * @function
 * @param {array} arr - array of fieldsets
 * @param {string} criteriaKey - unique identifier
 * @return {object} returns the element if found
 */
export async function FindCriteria(arr, criteriaKey) {
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
 * a function that takes the search string and parses them into an array
 * @function
 * @param {string} url - array of fieldsets
 * @return {array} returns array of objects
 */
export function GetQueryParams(url) {
  const paramArray = url.slice(url.indexOf('?') + 1).split('&')
  const selectedArray = paramArray.map(elem => {
    const [key, val] = elem.split('=')

    return {
      criteriaKey: key,
      value: decodeURIComponent(val),
    }
  })
  return selectedArray
}

/**
 *
 * GET FUNCTIONS
 *
 */

/**
 * a function that determines our langage state based on  the prefix of our URL
 * based on a string match in the pathname of the window object
 * @function
 */
export const Language = () => {
  const string = /^\/es/
  return string.test(window.location.pathname) ? 'es' : 'en'
}

/**
 * an async fetch to get life-event data.
 * @function
 * @param {string} lifeEvent - The inherited class from
 * @return {JSON} returns JSON data if succesfull
 */
export async function LifeEvent(lifeEvent) {
  let language, params, mode
  // get life-event from location
  if (lifeEvent === undefined) {
    const string = /^\/es/
    language = string.test(window.location.pathname) ? 'es_' : ''
    const windowQuery = window.location.search
    params = new URLSearchParams(windowQuery)
    mode = params.get('mode') === 'draft' ? `${params.get('mode')}/` : ''
    const location = window.location.pathname
    lifeEvent = location.substring(location.lastIndexOf('/') + 1)
  }

  let fetchPath
  if (process.env.NODE_ENV === 'production') {
    const app = document.getElementById('benefit-finder')

    if (app !== null) {
      const publishedData = app.getAttribute('json-data-file-path')
      const draftData = app.getAttribute('draft-json-data-file-path')
      fetchPath = params.get('mode') === 'draft' ? draftData : publishedData
    }
  } else {
    fetchPath = `/sites/default/files/benefit-finder/api/${mode}life-event/${language}${lifeEvent}.json`
  }

  if (fetchPath !== undefined) {
    const response = await fetch(fetchPath)
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
}

/**
 * a function to get the value object of selected fieldset values
 * @function
 * @param {object} item - fieldset object
 * @return {object} returns the object with a selected key
 */
export const SelectedValue = item =>
  item &&
  item.fieldset.inputs[0].inputCriteria.values.find(value => value.selected)

/**
 * a function to get array of children
 * @function
 * @param {object} item - parent fieldset object
 * @return {array} returns an array of children related to the param
 */
export const Children = item =>
  item && item.fieldset?.children.map(childItem => childItem.fieldsets[0])

/**
 * a function to get an array of all selected values
 * @function
 * @param {array} data - array of fieldset data
 * @return {array} returns the selected values
 */
export const SelectedValueAll = data =>
  data &&
  data
    .flatMap((item, i) =>
      item.section.fieldsets.flatMap(item => {
        const selected = GET.SelectedValue(item)
        return (
          selected && [
            {
              criteriaKey: item.fieldset.inputs[0].inputCriteria.id,
              values: selected,
            },
            GET.Children(item) &&
              GET.Children(item)
                .flatMap(
                  childItem =>
                    GET.SelectedValue(childItem) && {
                      criteriaKey: childItem.fieldset.criteriaKey,
                      values: GET.SelectedValue(childItem),
                    }
                )
                .filter(element => element !== undefined),
          ]
        )
      })
    )
    .flat() // we flatten all to have only one array
    .filter(element => element !== undefined) // remove undefined

/**
 * a function that filters determines eligibility of benefits by selected values
 * @function
 * @param {array} selectedCriteria - array of selected fieldset values
 * @param {array} data - array of benefits
 * @return {array} returns the selected values
 */
export const ElegibilityByCriteria = (selectedCriteria, data) => {
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
                UTILS.DateEligibility({
                  selectedValue: selected.values.value,
                  conditional: value,
                })
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

/**
 *
 * PUT FUNCTIONS
 *
 */

/**
 * an async fetch to get life-event data.
 * @function
 * @param {string} criteriaKey
 * @param {object} currentData
 * @param {function} setCurrentData
 * @param {string} eventTargetValue
 * @return {JSON || String} returns JSON data if succesfull
 */
export async function Data(
  criteriaKey,
  currentData,
  setCurrentData,
  eventTargetValue
) {
  // copy current data state
  const newData = { ...currentData }

  UTILS.FindCriteria(newData.section.fieldsets, criteriaKey)
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
 * @return {JSON || String} returns JSON data if succesfull
 */
export async function DataDate(
  criteriaKey,
  currentData,
  setCurrentData,
  eventTargetValue,
  eventTargetID
) {
  // copy current data state
  const newData = { ...currentData }

  UTILS.FindCriteria(newData.section.fieldsets, criteriaKey)
    .then(foundCriteria => {
      if (foundCriteria) {
        const inputValues =
          foundCriteria.fieldset?.inputs[0].inputCriteria.values

        if (eventTargetID) {
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
        } else {
          inputValues[0].value = eventTargetValue
        }
        inputValues[0].selected = true
        return setCurrentData(newData)
      }
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error)
      return 'Something went wrong.'
    })
}

/**
 * updates our data based on the window.location.search value
 * @function
 * @param {string} windowQuery
 * @param {array} stepDataArray
 * @param {function} setCurrentData
 * @param {string} sharedToken
 */
export const DataFromParams = (
  windowQuery,
  stepDataArray,
  setCurrentData,
  sharedToken
) => {
  const params = UTILS.GetQueryParams(decodeURI(windowQuery))
  params.filter(param => param.criteriaKey !== sharedToken)

  stepDataArray.forEach(arr => {
    arr.completed = true
    params.forEach(param => {
      const v = param.value.includes('{')
        ? JSON.parse(param.value)
        : param.value
      v !== undefined && typeof v === 'object'
        ? PUT.DataDate(param.criteriaKey, arr, setCurrentData, v)
        : PUT.Data(param.criteriaKey, arr, setCurrentData, v)
    })
  })
}

export const GET = {
  Children,
  ElegibilityByCriteria,
  LifeEvent,
  Language,
  SelectedValue,
  SelectedValueAll,
}

export const PUT = {
  Data,
  DataDate,
  DataFromParams,
}

export const UTILS = {
  FindCriteria,
  DateEligibility,
  GetQueryParams,
}
