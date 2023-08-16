import { useState } from 'react'
import { Button } from '../index'

/**
 * a functional component that renders a button with mailto email context
 * @component
 * @return {html} returns a semantic html button element with a custom function onClick event
 */
const EmailButton = ({ ui }) => {
  /**
   * a state hook that contains the window location href
   * @return {string} current state of window location href
   */
  const [shareLink, setShareLink] = useState(() => window.location.href)
  const emailSubject = 'Interesting information'
  const emailBody = 'I thought you might find this information interesting'

  /**
   * a handler that triggers an email with context from the users window location href
   */
  const handleClick = () => {
    setShareLink(window.location.href)

    window.location = `mailto:?subject=${emailSubject}&body=${emailBody} ${shareLink}`
  }

  return (
    <Button secondary onClick={handleClick}>
      {ui}
    </Button>
  )
}

export default EmailButton
