import { useState } from 'react'
import { buildURIParameter } from '../../utils'

/**
 * a functional component that renders a button with mailto email context
 * @component
 * @return {html} returns a semantic html button element with a custom function onClick event
 */
const EmailTrigger = ({ ui, data }) => {
  /**
   * a state hook that contains the window location href
   * @return {string} current state of window location href
   */
  const [shareLink, setShareLink] = useState(() =>
    buildURIParameter(window.location.href, data)
  )

  const emailBody = `${encodeURIComponent(shareLink)}`

  /**
   * a handler that triggers an email with context from the users window location href
   */
  const handleClick = () => {
    setShareLink(buildURIParameter(window.location.href, data))
    window.location = `mailto:?subject=${ui?.emailSubject}&body=${emailBody}`
  }

  return (
    <a className="bf-email-trigger" onClick={handleClick}>
      {ui?.emailTrigger || 'Email'}
    </a>
  )
}

export default EmailTrigger
