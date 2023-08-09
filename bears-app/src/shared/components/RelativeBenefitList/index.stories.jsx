import RelativeBenefitList from './index.jsx'
import content from '../../api/mock-data/content-data.js'

const { lifeEventForm } = JSON.parse(content)

const data = lifeEventForm.relevantBenefits

export default {
  component: RelativeBenefitList,
  tags: ['autodocs'],
  args: {
    data,
    dataKey: 'lifeEvent',
  },
}

export const Primary = {}
