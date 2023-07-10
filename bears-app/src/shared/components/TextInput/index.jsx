import { useHandleClassName } from '../../hooks/useHandleClassName'
import PropTypes from 'prop-types'

/**
 * a functional component that renders a field for text input
 * @component
 * @param {id} string - unique identifire
 * @param {className} string - inherited classes
 * @param {textarea} boolean - conditional to render textarea as return
 * @return {html} returns a semantic textarea or input
 */

const TextInput = ({ id, className, textarea }) => {
  const defaultClasses = !textarea ? ['usa-input'] : ['usa-textarea']

  /**
   * a functional component to create a textarea element.
   * @function
   * @param {props} object - inherited properties
   * @return {html} returns a semantic textarea
   */
  const TextArea = props => <textarea {...props} />

  /**
   * a functional component to create a input element.
   * @function
   * @param {props} object - inherited properties
   * @return {html} returns a semantic textarea
   */
  const PrimaryInput = props => <input {...props} type="text" />

  const Input = props =>
    !textarea ? <PrimaryInput {...props} /> : <TextArea {...props} />

  return (
    <Input
      className={useHandleClassName({
        className,
        defaultClasses,
      })}
      id={id}
      name={id}
    />
  )
}

TextInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  textarea: PropTypes.bool,
}

export default TextInput
