import TestRenderer from 'react-test-renderer'
import Button from '../index.jsx'

describe('Button', () => {
  it('renders a match to the previous snapshot', () => {
    const component = TestRenderer.create(<Button />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
