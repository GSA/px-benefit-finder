import Intro from './index.jsx'
import content from '../../api/mock-data/content-data.js'
import * as en from '../../locales/en/en.json'

const { lifeEventForm } = JSON.parse(content)

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
