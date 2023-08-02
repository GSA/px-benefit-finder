import renderer from 'react-test-renderer'
import LifeEventSection from '../index.jsx'

describe('LifeEventSection', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<LifeEventSection />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
