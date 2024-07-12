import { render } from '@testing-library/react'
import ResultsViewBlock from '../index.jsx'
import * as en from '../../../../../locales/en/en.json'

const { resultsView } = en

describe('ResultsViewBlock', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<ResultsViewBlock ui={resultsView} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
