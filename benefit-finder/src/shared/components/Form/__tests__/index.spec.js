import TestRenderer from 'react-test-renderer'
import Form from '../index.jsx'

describe('Form', () => {
  it('renders a match to the previous snapshot', () => {
    const component = TestRenderer.create(<Form />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
