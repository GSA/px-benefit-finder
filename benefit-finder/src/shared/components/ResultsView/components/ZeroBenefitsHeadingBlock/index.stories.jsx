import ZeroBenefitsHeadingBlock from './index.jsx'
import * as en from '../../../../locales/en/en.json'

const { zeroBenefits } = en.resultsView

export default {
  component: ZeroBenefitsHeadingBlock,
  tags: ['autodocs'],
  args: {
    ui: zeroBenefits,
    notEligibleView: false,
  },
}

export const Primary = {}
