import renderer from 'react-test-renderer'
import Date from '../index.jsx'

describe('Date', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<Date />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
