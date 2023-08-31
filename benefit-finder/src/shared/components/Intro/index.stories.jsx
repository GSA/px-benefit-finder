import Intro from './index.jsx'
import content from '../../api/mock-data/current.js'
import * as en from '../../locales/en/en.json'

const { data } = JSON.parse(content)
const { lifeEventForm } = data

export default {
  component: Intro,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    data: lifeEventForm,
    ui: en.intro,
  },
}

export const Primary = {}
