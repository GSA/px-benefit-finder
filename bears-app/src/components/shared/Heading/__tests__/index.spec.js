import renderer from 'react-test-renderer'
import Heading from '../index.jsx'

describe('Heading', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Heading headingLevel={1} />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
