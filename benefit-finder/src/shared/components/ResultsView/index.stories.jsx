import ResultsView from './index.jsx'
import * as en from '../../locales/en/en.json'

const { resultsView } = en

export default {
  component: ResultsView,
  tags: ['autodocs'],
  args: {
    ui: resultsView,
  },
}

export const Primary = {}
