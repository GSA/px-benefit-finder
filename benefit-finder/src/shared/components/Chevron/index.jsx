import PropTypes from 'prop-types'
import { Heading } from '../index'
import { createMarkup } from '../../utils'
import './_index.scss'

/**
 * a functional component to create a heading block with chevron styling
 * @function
 * @param {string} heading - The inherited heading value
 * @param {string} description - set as html
 * @return {html} returns a semantic html label
 */
const Chevron = ({ heading, description }) => {
  return (
    <div className="chevron">
      <div className="grid-container">
        <Heading className="chevron-heading" headingLevel={1}>
          {heading}
        </Heading>
        <div
          className="chevron-description"
          dangerouslySetInnerHTML={createMarkup(description)}
        />
      </div>
    </div>
  )
}

Chevron.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
}

export default Chevron
