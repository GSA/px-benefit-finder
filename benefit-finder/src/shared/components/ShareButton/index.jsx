import { useState } from 'react'
import { Button } from '../index'
import { buildURIParameter } from '../../utils'
import './_index.scss'

/**
 * a functional component that renders a button with copy-to-cipboard functionality
 * @component
 * @return {html} returns a semantic html button element with a custom function onClick event
 */

const ShareButton = ({ ui, data }) => {
  /**
   * a state hook that contains the window location href
   * @return {string} current state of window location href
   */
  const [shareLink, setShareLink] = useState(() =>
    buildURIParameter(window.location.href, data)
  )

  /**
   * a handler that copies the current window location href to the users clipboard
   */
  const handleClick = () => {
    setShareLink(buildURIParameter(window.location.href, data))
    navigator.clipboard.writeText(shareLink).then(
      () => alert(`${ui?.shareLinkContent} ${shareLink}`),
      err => alert('Failed to copy', err)
    )
  }

  return (
    <Button
      className="bf-share-button"
      secondary
      onClick={handleClick}
      icon="share"
      data-testid="bf-share-button"
    >
      {ui?.shareButton || 'Share'}
    </Button>
  )
}

export default ShareButton
