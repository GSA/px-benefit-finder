import KeyElegibilityCrieriaList from './index.jsx'

import content from '../../api/mock-data/content-data.js'

const { lifeEventForm } = JSON.parse(content)
const data = lifeEventForm.benefits[0].benefit.eligibility
const initialEligibilityLength =
  lifeEventForm.benefits[0].benefit.initialEligibilityLength

export default {
  component: KeyElegibilityCrieriaList,
  tags: ['autodocs'],
  args: {
    data,
    initialEligibilityLength,
  },
}

export const Primary = {}
