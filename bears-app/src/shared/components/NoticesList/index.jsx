import PropTypes from 'prop-types'
import createMarkup from '../../utils/createMarkup'

const NoticesList = ({ data }) => {
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
