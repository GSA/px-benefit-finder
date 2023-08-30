import NoticesList from './index.jsx'
import * as en from '../../locales/en/en.json'

export default {
  component: NoticesList,
  tags: ['autodocs'],
  args: {
    data: en.intro.notices.list,
  },
}

export const Primary = {}
