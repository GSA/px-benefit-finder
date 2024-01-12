import { useRef, useEffect } from 'react'

export const useResetElement = () => {
  /**
   * a hook to set and get the reset element to focus
   * @function
   * @return {ref} returns ref element
   */

  // create a sr-only element to set focus on that is not in the default tab order
  useEffect(() => {
    if (document.getElementById('index-reset') === null) {
      document.body.insertAdjacentHTML(
        'beforebegin',
        '<span tabIndex="-1" id="index-reset" class="a11y-sr-only"/>'
      )
    }
  }, [])

  const resetElement = useRef(document.getElementById('index-reset'))
  return resetElement
}
