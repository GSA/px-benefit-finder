/**
 * a function that collect all the required fields in the current step
 * @function
 */
export const getRequiredFieldsets = (document, setHandler) => {
  const collectedNodeList = document.querySelectorAll('fieldset')
  const requiredNodeList = Array.from(collectedNodeList).filter(
    node => node.attributes.required
  )
  setHandler(Array.from(requiredNodeList))
}

export const handleCheckForRequiredValues = async (
  requiredFieldsets,
  setHasError
) => {
  // handle most elements
  const invalidElements = requiredFieldsets
    .map(fieldset => {
      return (
        Array.from(fieldset.elements)
          // check all the required inputs, if there is no value, there the input is invalid
          .filter(el => {
            // we need to custom handle our dates verification to ensure a 4 digit year
            if (el.attributes['data-datetype']?.value === 'year') {
              return !el.value || (el.value && el.value.length !== 4)
            }
            // we allow for 02 but not 0 day value
            if (el.attributes['data-datetype']?.value === 'day') {
              return !el.value || (el.value && el.value === '0')
            }

            return !el.value
          })
      )
    })
    .flat()

  // handle radios/checks seperately
  const invalidRadioFieldSets = requiredFieldsets
    .map(fieldset => {
      if (
        Array.from(fieldset.elements).every(
          el => !el.attributes.type?.value === 'radio'
        )
      ) {
        return []
      }

      const radios = Array.from(fieldset.elements).filter(
        el => el.attributes.type?.value === 'radio'
      )

      if (radios.length > 0 && radios.every(el => !el.checked)) {
        return fieldset
      }
      return []
    })
    .flat()

  const mergeInvalidElements = [invalidElements, invalidRadioFieldSets].flat()
  setHasError(mergeInvalidElements)
  return mergeInvalidElements.length === 0
}

export const handleInvalid = ({
  required,
  hasError,
  criteriaKey,
  fieldSetId,
  useFilter = false,
}) => {
  const handleMap = hasError
    .map(errorItem => {
      return (
        (errorItem.id !== undefined &&
          fieldSetId &&
          fieldSetId.includes(errorItem.id)) ||
        (errorItem.id !== undefined && errorItem.id.includes(criteriaKey))
      )
    })
    .includes(true)

  const hanldeFilter = hasError.filter(errorItem => {
    return errorItem.id !== undefined && errorItem.id.includes(fieldSetId)
  })

  return required && useFilter === true ? hanldeFilter : handleMap
}

export default {
  getRequiredFieldsets,
  handleCheckForRequiredValues,
  handleInvalid,
}
