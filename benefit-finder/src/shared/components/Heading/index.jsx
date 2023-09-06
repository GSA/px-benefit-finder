import PropTypes from 'prop-types'
import { useHandleClassName } from '../../hooks/useHandleClassName'
import './_index.scss'

/**
 * a functional component that renders a semantic heading element
 * @component
 * @param {React.ReactNode} children - inherited children
 * @param {string} className - inherited class names
 * @param {number} headingLevel - inherited class(es)
 * @return {html} returns a semantic html anchor element
 */
const Heading = ({ children, className, headingLevel, ...props }) => {
  // pass our default classes
  const defaultClasses = ['font-family-sans']

  // return html as a tring for heading element values
  const Tag = `h${headingLevel}`
  return (
    <Tag
      className={useHandleClassName({ className, defaultClasses })}
      {...props}
    >
      {children}
    </Tag>
  )
}

Heading.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  headingLevel: PropTypes.number,
}

export default Heading
