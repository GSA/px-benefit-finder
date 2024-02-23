import PropTypes from 'prop-types'
import * as Icons from './index_icons'
import './_index.scss'

/**
 * a functional component that renders a svg icon
 * @component
 * @param {string} type - string kabob value of component name
 * @param {string} color - hex or value
 * @param {any} props - inherited props
 * @return {html} returns a semantic <i> element with <svg> inside
 */
const Icon = ({ type, color, ...props }) => {
  let icon

  switch (type) {
    case 'carrot-small':
      icon = <Icons.CarrotSmall color={color} />
      break
    case 'carrot-big':
      icon = <Icons.CarrotBig />
      break
    case 'death':
      icon = <Icons.Death />
      break
    case 'disability':
      icon = <Icons.Disability />
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
    case 'modal-close':
      icon = <Icons.ModalClose />
      break
    case 'retirement':
      icon = <Icons.Retirement />
      break
    default:
      icon = null
  }
  return (
    <i {...props} aria-hidden="true">
      {icon}
    </i>
  )
}

Icon.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  props: PropTypes.any,
}

export default Icon
