import PropTypes from 'prop-types'
import * as Icons from './index_icons'
import './_index.scss'

const Icon = ({ type, color, ...props }) => {
  let icon

  switch (type) {
    case 'carrot-small':
      icon = <Icons.CarrotSmall color={color} {...props} />
      break
    case 'carrot-big':
      icon = <Icons.CarrotBig {...props} />
      break
    case 'close':
      icon = <Icons.Close {...props} />
      break
    case 'green-check':
      icon = <Icons.GreenCheck {...props} />
      break
    case 'open':
      icon = <Icons.Open {...props} />
      break
    case 'modal-close':
      icon = <Icons.ModalClose {...props} />
      break
    default:
      icon = null
  }
  return icon
}

Icon.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  props: PropTypes.any,
}

export default Icon
