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

  // remove null values
  for (const key in newObj) {
    if (newObj[key] === null) {
      delete newObj[key]
    }
  }
  window.dataLayer.push({ event: 'bf_page_change', bfData: newObj })
}

export default dataLayerPush
