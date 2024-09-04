import { useState, useEffect, useLayoutEffect } from 'react'

const useWindowSize = w => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const desktopWidth = 1049

  useEffect(() => {
    setWindowWidth(w.innerWidth)
  }, [windowWidth])

  useLayoutEffect(() => {
    const resize = () => setWindowWidth(w.innerWidth)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useLayoutEffect(() => {
    if (windowWidth < desktopWidth) {
      setIsDesktop(false)
    } else {
      setIsDesktop(true)
    }
  }, [windowWidth])

  const windowSize = { width: windowWidth, desktop: isDesktop }
  return windowSize
}

export default useWindowSize
