import renderer from 'react-test-renderer'
import RelativeBenefitList from '../index.jsx'

describe('RelativeBenefitList', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<RelativeBenefitList />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
