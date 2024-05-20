const defaultDataLayerObj = {
  pageView: null,
  viewTitle: null,
  viewState: null,
  benefits: null,
  eligible: null,
  notEligible: null,
  moreInfo: null,
}

const dataLayerPush = newData => {
  // merge values into default obj
  const newObj = { ...defaultDataLayerObj, ...newData }

  // merge values into window object
  const newDataObj = { ...window.dataLayer[0], ...newObj }

  // remove null values
  for (const key in newDataObj) {
    if (newDataObj[key] === null) {
      delete newDataObj[key]
    }
  }

  // replaace window object
  window.dataLayer[0] = newDataObj
}

export default dataLayerPush
