import renderer from 'react-test-renderer'
import ObfuscatedLink from '../index.jsx'

describe('ObfuscatedLink', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<ObfuscatedLink />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
