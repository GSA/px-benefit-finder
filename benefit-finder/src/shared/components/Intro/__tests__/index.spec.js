import renderer from 'react-test-renderer'
import Intro from '../index.jsx'
import * as en from '../../../locales/en/en.json'
import content from '../../../api/mock-data/content-data.js'

describe('Intro', () => {
  const t = en
  const { lifeEventForm } = JSON.parse(content)

  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(
      <Intro data={lifeEventForm} ui={t.intro} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
