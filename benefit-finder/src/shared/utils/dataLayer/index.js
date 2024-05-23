const dataLayerPush = newData => {
  window.dataLayer.push({ event: 'bf_page_change', bfData: newData })
}

export default dataLayerPush
