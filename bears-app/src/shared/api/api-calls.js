/**
 * an async fetch to get life-event data.
 * @function
 * @param {string} lifeEvent - The inherited class from
 * @return {JSON || Sring} returns JSON data if succesfull
 */
export async function GETLifeEvent(lifeEvent) {
  // get life-event from location
  if (lifeEvent === undefined) {
    const location = window.location.pathname
    lifeEvent = location.substring(location.lastIndexOf('/') + 1)
  }
  const response = await fetch(`/bears/api/life-event/${lifeEvent}`)
    .then(response => {
      if (response?.ok) {
        return response.json()
      }
      throw new Error(response?.status)
    })
    .then(responseJson => {
      return responseJson?.data.length > 0
        ? responseJson
        : 'Something went wrong.'
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error)
      return 'Something went wrong.'
    })
  return response
}
