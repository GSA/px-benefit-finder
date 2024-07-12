import NotEligibleBenefitsHeadingBlock from './index.jsx'
import * as en from '../../../../locales/en/en.json'

const { notEligible, summaryBox } = en.resultsView

export default {
  component: NotEligibleBenefitsHeadingBlock,
  tags: ['autodocs'],
  args: {
    ui: { notEligible, summaryBox },
  },
}

export const Primary = {}
