import { useEffect } from 'react'

export const useHandleUnload = hasData => {
  /**
   * a state function to manage a native alert to user if data has values
   * @function
   * @param {boolean} hasData - state of data
   * @return {effect} returns eventhandler
   */

  // Sets up prompt that if user hits browser back/refresh button and has imputed any data will alert that data will be lost
  useEffect(() => {
    const handleBeforeUnload = event => {
      event.preventDefault()
      event.returnValue = ''
    }
    if (hasData !== false) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasData])
}
