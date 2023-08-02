import renderer from 'react-test-renderer'
import LifeEventSection from '../index.jsx'
import * as en from '../../../locales/en/en.json'

describe('LifeEventSection', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(<LifeEventSection ui={en} />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
