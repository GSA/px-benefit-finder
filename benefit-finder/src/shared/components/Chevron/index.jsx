import PropTypes from 'prop-types'
import { Heading } from '@components'
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
    <div className="bf-chevron">
      <div className="bf-grid-container grid-container">
        <Heading className="bf-chevron-heading" headingLevel={1}>
          {heading}
        </Heading>
        <div
          className="bf-chevron-description"
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
