import { useState } from 'react'
import { Button } from '../index'

/**
 * a functional component that renders a button with copy-to-cipboard functionality
 * @component
 * @return {html} returns a semantic html button element with a custom function onClick event
 */

const ShareButton = () => {
  /**
   * a state hook that contains the window location href
   * @return {string} current state of window location href
   */
  const [shareLink, setShareLink] = useState(() => window.location.href)

  /**
   * a handler that copies the current window location href to the users clipboard
   */
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
