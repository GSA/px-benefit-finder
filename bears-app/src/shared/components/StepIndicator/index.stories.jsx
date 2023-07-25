import StepIndicator from './index.jsx'
import * as DATA from '../../api/mock-data/content-data.json'

const data = DATA.lifeEventForm.sectionsEligibilityCriteria

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
