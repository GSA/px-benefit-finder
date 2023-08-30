import { Hint, Legend } from '../index'
import PropTypes from 'prop-types'
import { useHandleClassName } from '../../hooks/useHandleClassName'

/**
 * a functional component that renders a string
 * @component
 * @param {React.ReactNode} children - inherited children
 * @param {string} legend - passed to Legend component
 * @param {string} hint - passed to Hint component
 * @param {string} className - inherited classes
 * @return {html} returns a div
 */
const Fieldset = ({
  children,
  legend,
  required,
  alertRef,
  requiredLabel,
  hidden,
  hint,
  className,
}) => {
  const handleHidden = hidden !== undefined && hidden ? ['display-none'] : ''
  const defaultClasses = ['usa-fieldset']
  const utilityClasses = handleHidden

  /**
   * a functional component that renders a legend with a required hint
   * @component
   * @param {React.ReactNode} children - inherited children
   * @param {string} legend - passed to Legend component
   * @param {object} requiredLabel - passed to Hint component
   * @return {html} returns a div
   */
  const RequiredFlag = () => (
    <>
      <Legend>
        {legend}
        <Hint requiredLabel={requiredLabel} />
      </Legend>
    </>
  )

  // determine if we need to include a reqired hint
  const handleRequired =
    required === 'FALSE' ? <Legend>{legend}</Legend> : RequiredFlag()

  return (
    <fieldset
      className={useHandleClassName({
        className,
        defaultClasses,
        utilityClasses,
      })}
      ref={alertRef}
    >
      {hint}
      {legend && handleRequired}
      {children}
    </fieldset>
  )
}

Fieldset.propTypes = {
  children: PropTypes.node,
  legend: PropTypes.string,
  alertRef: PropTypes.any,
  requiredLabel: PropTypes.object,
  hidden: PropTypes.bool,
  hint: PropTypes.string,
  className: PropTypes.string,
}

export default Fieldset
