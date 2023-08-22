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
