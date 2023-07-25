import RelativeBenefitList from './index.jsx'
import * as DATA from '../../api/mock-data/content-data.json'

const data = DATA.lifeEventForm.relevantBenefits

export default {
  component: RelativeBenefitList,
  tags: ['autodocs'],
  args: {
    data,
    dataKey: 'lifeEvent',
  },
}

export const Primary = {}
