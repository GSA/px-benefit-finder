import { useState } from 'react'
import { Button } from '../index'

/**
 * a functional component that renders a button with copy-to-cipboard functionality
 * @component
 * @return {html} returns a semantic html button element with a custom function onClick event
 */

const ShareButton = () => {
  const [shareLink, setShareLink] = useState(() => window.location.href)

  const handleClick = () => {
    setShareLink(window.location.href)
    navigator.clipboard.writeText(shareLink).then(
      () => alert(`copied successfully! ${shareLink}`),
      err => alert('Failed to copy', err)
    )
  }

  return (
    <Button secondary onClick={handleClick}>
      Share
    </Button>
  )
}

export default ShareButton
