import PropTypes from 'prop-types'
import createMarkup from '../../utils/createMarkup'
import { Alert } from '../index'

import './_index.scss'

/**
 * a functional component that renders a list of information
 * @component
 * @param {array} data inherited ui translations
 * @return {html} returns a semantic ul
 */
const NoticesList = ({ data }) => {
  /**
   * a functional component that renders a link as a button
   * @component
   * @param {object} data inherited ui translations
   * @return {html} returns a semantic li
   */
  const Notices = data => {
    return (
      data &&
      data.data.map((item, i) => {
        return (
          <li className="notice" key={`notice-${i}`}>
            <Alert noBackground>
              <div dangerouslySetInnerHTML={createMarkup(item.notice)}></div>
            </Alert>
          </li>
        )
      })
    )
  }

  return (
    <div className="notices">
      <ul className="notices-list add-list-reset">
        <Notices data={data} />
      </ul>
    </div>
  )
}

NoticesList.propTypes = {
  data: PropTypes.array,
}

export default NoticesList
