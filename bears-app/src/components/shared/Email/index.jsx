import { useState } from 'react'
import { Button } from '../index'
import PropTypes from 'prop-types'

const Email = props => {
  const [shareLink, setShareLink] = useState(() => window.location.href)
  const emailSubject = 'Interesting information'
  const emailBody = 'I thought you might find this information interesting'

  const handleClick = () => {
    setShareLink(window.location.href)

    window.location = `mailto:?subject=${emailSubject}&body=${emailBody} ${shareLink}`
  }

  return (
    <Button secondary {...props} onClick={handleClick}>
      Email
    </Button>
  )
}

Email.propTypes = {
  props: PropTypes.any,
}

export default Email
