import BenefitAccordionGroup from './index.jsx'
import content from '../../api/mock-data/current.js'

const { data } = JSON.parse(content)
const { benefits } = data
const b = [benefits[0], benefits[1]]
const entryKey = Object.keys(b[0])

export default {
  component: BenefitAccordionGroup,
  tags: ['autodocs'],
  args: {
    data: b,
    entryKey: entryKey[0],
  },
}

export const Primary = {}

export const ExpandAll = {
  args: {
    ...Primary.args,
    expandAll: true,
  },
}
