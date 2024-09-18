import { render } from '@testing-library/react'
import Results from '../index.jsx'
import * as en from '@locales/en/en.json'

const { resultsView } = en

describe('Results', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(<Results ui={resultsView} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
