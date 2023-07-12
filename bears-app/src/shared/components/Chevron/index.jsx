import PropTypes from 'prop-types'
import { Heading } from '../index'
import './_index.scss'

/**
 * a functional component to create a heading block with chevron styling
 * @function
 * @param {string} heading - The inherited heading value
 * @param {string} description - set as html
 * @return {html} returns a semantic html label
 */
const Chevron = ({ heading, description }) => {
  const createMarkup = description => {
    return { __html: description }
  }

  return (
    <div className="chevron">
      <Heading headingLevel={1}>{heading}</Heading>
      <div dangerouslySetInnerHTML={createMarkup(description)} />
    </div>
  )
}

Chevron.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
}

export default Chevron
