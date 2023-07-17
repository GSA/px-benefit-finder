import KeyElegibilityCrieriaList from './index.jsx'

import * as DATA from '../../api/mock-data/content-data.json'

const data = DATA.benefits[0].benefit.eligibility
const initialEligibilityLength =
  DATA.benefits[0].benefit.initialEligibilityLength

export default {
  component: KeyElegibilityCrieriaList,
  tags: ['autodocs'],
  args: {
    data,
    initialEligibilityLength,
  },
}

export const Primary = {}
