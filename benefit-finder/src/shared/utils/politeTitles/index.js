const politeTitles = (location, locale) => {
  // create a hidden liveRegion to announce titles to screen-readers
  const liveRegion = document.getElementById('live-region')

  // get the last part of the location Path
  // remove the hyphen
  const pathValue = location.split('/').pop()
  const title = pathValue.replace('-', ' ')

  // create language specific titles
  const enTitle = `Entering Benefit Finder: ${title.toLowerCase()} | USAGov`
  const esTitle = `Buscador de beneficios: ${title.toLowerCase()} | USAGov`
  const defaultTitle = `${title} | USAGov`

  // assign title based on locale
  const politeTitle = !locale
    ? defaultTitle
    : locale === 'es'
      ? esTitle
      : enTitle

  // update the live region
  if (liveRegion) {
    liveRegion.textContent = politeTitle
  }
  // update the page title
  document.title = politeTitle

  return
}

export default politeTitles
