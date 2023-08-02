import StepIndicator from './index.jsx'
import content from '../../api/mock-data/content-data.js'

const { lifeEventForm } = JSON.parse(content)
const data = lifeEventForm.sectionsEligibilityCriteria

export default {
  component: StepIndicator,
  tags: ['autodocs'],
  args: {
    data,
  },
}

export const Primary = {}

export const NoHeadings = {
  args: {
    ...Primary,
    noHeadings: true,
  },
}
