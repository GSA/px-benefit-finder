import BenefitAccordionGroup from './index.jsx'
import content from '../../api/mock-data/content-data.js'

const { benefits } = JSON.parse(content)
const data = [benefits[0], benefits[0]]
const entryKey = Object.keys(data[0])

export default {
  component: BenefitAccordionGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    data,
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
