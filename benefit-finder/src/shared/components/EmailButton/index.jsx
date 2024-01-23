import { useState } from 'react'
import { Button } from '../index'
import { buildURIParameter } from '../../utils'
import './_index.scss'

/**
 * a functional component that renders a button with mailto email context
 * @component
 * @return {html} returns a semantic html button element with a custom function onClick event
 */
const EmailButton = ({ ui, data }) => {
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
    <Button className="email-button" secondary onClick={handleClick}>
      {ui?.emailButton || 'Email'}
    </Button>
  )
}

export default EmailButton
