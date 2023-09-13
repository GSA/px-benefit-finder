import { useState } from 'react'
import { Button } from '../index'
import buildURIParameter from '../../utils/buildURIParameter.js'

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
  const emailSubject = 'Interesting information'
  const emailBody = `I thought you might find this information interesting %0D%0A%0D%0A${encodeURIComponent(
    shareLink
  )}`

  /**
   * a handler that triggers an email with context from the users window location href
   */
  const handleClick = () => {
    setShareLink(buildURIParameter(window.location.href, data))
    window.location = `mailto:?subject=${emailSubject}&body=${emailBody}`
  }

  return (
    <Button secondary onClick={handleClick}>
      {ui || 'Email'}
    </Button>
  )
}

export default EmailButton
