import { useLayoutEffect, useState } from 'react'

const desktopMin = 1049

export const useDesktop = () => {
  const [windowWidth, getWindowWidth] = useState(window.innerWidth)
  const setWindowWidth = () => {
    getWindowWidth(window.innerWidth)
  }
  useLayoutEffect(() => {
    window.addEventListener('resize', setWindowWidth)
    return () => {
      window.removeEventListener('resize', setWindowWidth)
    }
  }, [windowWidth])
  return windowWidth > desktopMin
}
