import renderer from 'react-test-renderer'
import BenefitAccordionGroup from '../index.jsx'

describe('BenefitAccordionGroup', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<BenefitAccordionGroup />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
