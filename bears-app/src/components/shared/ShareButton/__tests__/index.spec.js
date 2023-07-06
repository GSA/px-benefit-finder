import renderer from 'react-test-renderer'
import ShareButton from '../index.jsx'

describe('Share', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<ShareButton />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
