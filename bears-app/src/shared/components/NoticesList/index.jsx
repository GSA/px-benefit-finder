import PropTypes from 'prop-types'
import createMarkup from '../../utils/createMarkup'

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
          <li
            className="notice"
            key={i}
            dangerouslySetInnerHTML={createMarkup(item.notice)}
          />
        )
      })
    )
  }

  return (
    <ul className="notices-list">
      <Notices className="notices" data={data} />
    </ul>
  )
}

NoticesList.propTypes = {
  data: PropTypes.array,
}

export default NoticesList
