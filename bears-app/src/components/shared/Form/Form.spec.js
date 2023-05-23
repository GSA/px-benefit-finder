import TestRenderer from 'react-test-renderer'
import Form from './index.jsx'

describe('Select', () => {
  it('renders a match to the previous snapshot', () => {
    const component = TestRenderer.create(<Form />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
