import PropTypes from 'prop-types'
import { Card } from '../index'

/**
 * a functional component that renders a list of usa-card component(s)
 * @component
 * @param {array} data - passed benefits data
 * @param {string} dataKey - key to reference
 * @return {html} returns a semantic html unorderd list element
 */
const RelativeBenefitList = ({ data, dataKey }) => {
  return (
    <ul className="usa-card-group">
      {data &&
        data.map((item, i) => {
          const { title, link, body } = item[dataKey]

          return (
            <Card
              className="relative-benefit-card tablet:grid-col-6"
              title={title}
              body={body}
              href={link}
              key={`${title}-${i}`}
            />
          )
        })}
    </ul>
  )
}

RelativeBenefitList.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
}

export default RelativeBenefitList
