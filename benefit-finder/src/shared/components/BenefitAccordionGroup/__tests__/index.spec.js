import renderer from 'react-test-renderer'
import BenefitAccordionGroup from '../index.jsx'
import * as en from '../../../locales/en/en.json'

describe('BenefitAccordionGroup', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(
      <BenefitAccordionGroup ui={en.resultsView} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
