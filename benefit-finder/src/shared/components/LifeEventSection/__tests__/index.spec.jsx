import { render } from '@testing-library/react'
import LifeEventSection from '../index.jsx'
import content from '../../../api/mock-data/current.js'
import * as en from '../../../locales/en/en.json'

const { data } = JSON.parse(content)
const { lifeEventForm } = data

beforeAll(() => {
  // handle window.scrollTo
  const noop = () => {}
  Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })
})

describe('LifeEventSection', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(
      <LifeEventSection
        ui={en}
        data={lifeEventForm.sectionsEligibilityCriteria}
        step={1}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
