import PropTypes from 'prop-types'
import * as Icons from './index_icons'
import './_index.scss'

const Icon = ({ type, color }) => {
  // console.log()

  let icon

  switch (type) {
    case 'carrot-small':
      icon = <Icons.CarrotSmall color={color} />
      break
    case 'carrot-big':
      icon = <Icons.CarrotBig />
      break
    case 'close':
      icon = <Icons.Close />
      break
    case 'green-check':
      icon = <Icons.GreenCheck />
      break
    case 'open':
      icon = <Icons.Open />
      break
    default:
      icon = '-'
  }

  return icon
}

Icon.propTypes = {
  type: PropTypes.string,
}

export default Icon
