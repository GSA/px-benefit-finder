import renderer from 'react-test-renderer'
import Share from '../index.jsx'

describe('Share', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Share />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
