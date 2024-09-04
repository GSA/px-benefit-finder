import { useEffect } from 'react'
import { windowSize } from '../../utils'

const useCrazyEggUpdate = ({ pageView, notEligibleView }) => {
  const isDesktop = windowSize(window).desktop
  // handle dataLayer
  useEffect(() => {
    // crazyegg
    const crazyeggEl = document.getElementById('bf-track-by-name')
    const lifeEventId = document.querySelector('[data-testid="app"]')

    const device = isDesktop ? 'desktop' : 'mobile'
    const newContent = `var CE_SNAPSHOT_NAME = "${pageView}-${lifeEventId?.id}-${device}";`

    if (crazyeggEl !== null) {
      crazyeggEl.innerHTML = newContent
    }
  }, [isDesktop, notEligibleView])
}

export default useCrazyEggUpdate
