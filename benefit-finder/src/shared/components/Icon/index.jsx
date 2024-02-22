import PropTypes from 'prop-types'
import * as Icons from './index_icons'
import './_index.scss'

const Icon = ({ type, color, ...props }) => {
  switch (type) {
    case 'carrot-small':
      return <Icons.CarrotSmall color={color} {...props} />
    case 'carrot-big':
      return <Icons.CarrotBig {...props} />
    case 'close':
      return <Icons.Close {...props} />
    case 'green-check':
      return <Icons.GreenCheck {...props} />
    case 'open':
      return <Icons.Open {...props} />
    case 'modal-close':
      return <Icons.ModalClose {...props} />
    default:
      return null
  }
}

Icon.propTypes = {
  type: PropTypes.string,
}

export default Icon
