import TestRenderer from 'react-test-renderer'
import App from '../index'

describe('App', () => {
  it('renders a match to the previous snapshot', () => {
    const component = TestRenderer.create(<App />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
