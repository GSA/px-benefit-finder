import ZeroBenefitsHeadingBlock from './index.jsx'
import * as en from '../../../../locales/en/en.json'

const { zeroBenefits } = en.resultsView

console.log(en)

export default {
  component: ZeroBenefitsHeadingBlock,
  tags: ['autodocs'],
  args: {
    ui: zeroBenefits,
    notEligibleView: false,
  },
}

export const Primary = {}
