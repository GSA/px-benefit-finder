import renderer from 'react-test-renderer'
import Paragraph from '../index.jsx'

describe('Paragraph', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Paragraph />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
