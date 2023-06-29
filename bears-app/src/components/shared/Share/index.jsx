import { useState } from 'react'
import { Button } from '../index'
import PropTypes from 'prop-types'

const Share = props => {
  const [shareLink, setShareLink] = useState(() => window.location.href)

  const handleClick = () => {
    setShareLink(window.location.href)
    navigator.clipboard.writeText(shareLink).then(
      function () {
        alert(`copied successfully! ${shareLink}`)
      },
      function (err) {
        alert('Failed to copy', err)
      }
    )
  }

  return (
    <Button secondary {...props} onClick={handleClick}>
      Share
    </Button>
  )
}

Share.propTypes = {
  props: PropTypes.any,
}

export default Share
