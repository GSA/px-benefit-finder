import EligibleBenefitsHeadingBlock from './index.jsx'
import * as en from '../../../../locales/en/en.json'

const { eligible, summaryBox } = en.resultsView

export default {
  component: EligibleBenefitsHeadingBlock,
  tags: ['autodocs'],
  args: {
    ui: { eligible, summaryBox },
  },
}

export const Primary = {}
