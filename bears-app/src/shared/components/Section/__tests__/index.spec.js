import renderer from 'react-test-renderer'
import Section from '../index.jsx'

describe('Section', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Section />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
