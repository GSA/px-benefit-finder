import KeyElegibilityCrieriaList from './index.jsx'
import content from '../../api/mock-data/current.js'

const { data } = JSON.parse(content)
const { benefits } = data
const b = benefits[0].benefit.eligibility
const initialEligibilityLength = benefits[0].benefit.initialEligibilityLength

export default {
  component: KeyElegibilityCrieriaList,
  tags: ['autodocs'],
  args: {
    data: b,
    initialEligibilityLength,
  },
}

export const Primary = {}
