import PropTypes from 'prop-types'
import { useHandleClassName } from '../../hooks/useHandleClassName'
import './_index.scss'

const Heading = ({ children, headingLevel, className }) => {
  const defaultClasses = ['font-family-sans']

  const Tag = `h${headingLevel}`
  return (
    <Tag className={useHandleClassName({ className, defaultClasses })}>
      {children}
    </Tag>
  )
}

Heading.propTypes = {
  children: PropTypes.string,
  headingLevel: PropTypes.number,
}

export default Heading
