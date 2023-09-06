import renderer from 'react-test-renderer'
import ResultsView from '../index.jsx'
import * as en from '../../../locales/en/en.json'

describe('ResultsView', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<ResultsView ui={en.resultsView} />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
