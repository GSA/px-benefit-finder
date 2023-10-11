import renderer from 'react-test-renderer'
import KeyElegibilityCrieriaList from '../index.jsx'
import * as en from '../../../locales/en/en.json'

describe('KeyElegibilityCrieriaList', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(
      <KeyElegibilityCrieriaList ui={en.resultsView.benefitAccordion} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
