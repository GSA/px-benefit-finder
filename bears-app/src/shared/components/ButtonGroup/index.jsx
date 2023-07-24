import { Button } from '../index'
import PropTypes from 'prop-types'

/**
 * a functional component to create a group of navigational buttons.
 * @function
 * @param {object} buttonOne - The object config for the first button element
 * @param {object} buttonTwo - The object config for the second button element
 * @return {html} returns a unorderd list of buttons
 */
const ButtonGroup = ({ buttonOne, buttonTwo }) => {
  return (
    <ul className="usa-button-group width-full">
      <li className="usa-button-group__item width-full">
        <Button {...buttonOne}>{buttonOne && buttonOne.children}</Button>
      </li>
      <li className="usa-button-group__item width-full">
        <Button {...buttonTwo}>{buttonOne && buttonTwo.children}</Button>
      </li>
    </ul>
  )
}

ButtonGroup.propTypes = {
  buttonOne: PropTypes.object,
  buttonTwo: PropTypes.object,
}

export default ButtonGroup
