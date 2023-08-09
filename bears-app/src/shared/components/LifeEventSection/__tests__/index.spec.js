import renderer from 'react-test-renderer'
import LifeEventSection from '../index.jsx'
import content from '../../../api/mock-data/content-data.js'
import * as en from '../../../locales/en/en.json'

const { lifeEventForm } = JSON.parse(content)

describe('LifeEventSection', () => {
  it('renders a match to the previous snapshot', () => {
    const component = renderer.create(
      <LifeEventSection
        ui={en}
        data={lifeEventForm.sectionsEligibilityCriteria}
        step={1}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
