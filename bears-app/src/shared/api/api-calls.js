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
