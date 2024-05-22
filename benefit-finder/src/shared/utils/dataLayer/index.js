const defaultDataLayerObj = {
  pageView: null,
  viewTitle: null,
  viewState: null,
  benefits: null,
  eligible: null,
  notEligible: null,
  moreInfo: null,
  criteriaValues: null,
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

  window.dataLayer.push(() => this.reset())
  window.dataLayer.push(newDataObj)
  window.dataLayer.push({ event: 'page_change', bfData: newDataObj })
}

export default dataLayerPush
