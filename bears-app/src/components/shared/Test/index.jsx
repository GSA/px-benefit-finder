import PropTypes from 'prop-types'
import './_test.scss'

const Test = props => {
  return (
    <div>
      <h2>Hello World!</h2>
    </div>
  )
}

Test.propTypes = {
  props: PropTypes.any,
}

export default Test
