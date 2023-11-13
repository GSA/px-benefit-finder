import renderer from 'react-test-renderer'
import Accordion from '../index.jsx'

describe('Accordion', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Accordion />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
