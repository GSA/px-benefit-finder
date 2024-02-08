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
    <ul className="benefit-button-group usa-button-group width-full">
      <li
        className="benefit-button-group__item usa-button-group__item width-full"
        key="buttonOne"
      >
        <Button {...buttonOne}>{buttonOne && buttonOne.children}</Button>
      </li>
      <li
        className="benefit-button-group__item usa-button-group__item width-full"
        key="buttonTwo"
      >
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
