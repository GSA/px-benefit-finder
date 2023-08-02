import LifeEventSection from './index.jsx'
import content from '../../api/mock-data/content-data.js'
import * as en from '../../locales/en/en.json'

const { lifeEventForm } = JSON.parse(content)

export default {
  component: LifeEventSection,
  tags: ['autodocs'],
  args: {
    ui: { ...en },
    data: lifeEventForm.sectionsEligibilityCriteria,
    step: 1,
  },
}

export const Primary = {}
