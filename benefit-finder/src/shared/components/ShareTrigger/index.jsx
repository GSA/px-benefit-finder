import { useState } from 'react'
import { buildURIParameter } from '../../utils'

/**
 * a functional component that renders a button with copy-to-cipboard functionality
 * @component
 * @return {html} returns a semantic html button element with a custom function onClick event
 */

const ShareTrigger = ({ ui, data }) => {
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
  const handleClick = e => {
    e.preventDefault()
    setShareLink(buildURIParameter(window.location.href, data))
    navigator.clipboard.writeText(shareLink).then(
      () => alert(`${ui?.shareLinkContent} ${shareLink}`),
      err => alert('Failed to copy', err)
    )
  }

  return (
    <a
      href=""
      className="bf-share-trigger bf-usa-link usa-link"
      onClick={e => handleClick(e)}
      data-testid="bf-share-trigger"
    >
      {ui?.shareTrigger || 'Share'}
    </a>
  )
}

export default ShareTrigger