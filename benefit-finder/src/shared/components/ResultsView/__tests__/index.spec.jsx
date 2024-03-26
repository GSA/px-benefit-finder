import { render, screen } from '@testing-library/react'
import ResultsView from '../index.jsx'
import * as apiCalls from '../../../api/apiCalls.js'
import * as en from '../../../locales/en/en.json'
import content from '../../../api/mock-data/current.js'
const { data } = JSON.parse(content)

// get current data - subtract two years
const generateDOD = () => {
  const currentDate = new Date()
  return encodeURIComponent(
    JSON.stringify({
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      year: currentDate.getFullYear() - 2,
    })
  )
}

const scenarios = {
  death: [
    {
      scenario: 1,
      windowQuery: `?applicant_date_of_birth=%7B"month"%3A"3"%2C"day"%3A"5"%2C"year"%3A"1960"%7D&applicant_relationship_to_the_deceased=Spouse&applicant_marital_status=Widowed&applicant_citizen_status=Yes&applicant_care_for_child=Yes&applicant_paid_funeral_expenses=Yes&deceased_date_of_death=${generateDOD()}&deceased_death_location_is_US=Yes&deceased_paid_into_SS=Yes&deceased_public_safety_officer=No&deceased_miner=No&deceased_american_indian=No&deceased_died_of_COVID=Yes&deceased_served_in_active_military=No&shared=true%27`,
    },
  ],
}

const windowQuery = scenarios.death[0].windowQuery // Returns:'?q=123'
const benfitsArray = [...data.benefits]
const sharedToken = 'shared'
let stepDataArray
let currentData
let expectedUpdate
// mock useState Function
function setCurrentData(updatedData) {
  currentData = updatedData
}

beforeAll(() => {
  // handle window.scrollTo
  const noop = () => {}
  Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

  stepDataArray = [...data.lifeEventForm.sectionsEligibilityCriteria]
  setCurrentData(stepDataArray[0])

  apiCalls.PUT.DataFromParams(
    windowQuery,
    stepDataArray,
    setCurrentData,
    sharedToken
  )
  expectedUpdate =
    currentData.section.fieldsets[1].fieldset.inputs[0].inputCriteria.values
})

// render view without data
test('loads view', async () => {
  const view = render(<ResultsView ui={en.resultsView} />)
  await screen.findByTestId('bf-result-view')
  expect(view.baseElement).toMatchSnapshot()
})

// render view with data
test('scenario 1 loads in view with the correct amount of likely eligible items', async () => {
  expect(expectedUpdate[0]).toHaveProperty('selected', true)
  const view = render(
    <ResultsView
      ui={en.resultsView}
      stepDataArray={stepDataArray}
      data={benfitsArray}
    />
  )

  const eligibility = apiCalls.GET.ElegibilityByCriteria(
    stepDataArray,
    benfitsArray
  )

  const e = eligibility.filter(item => {
    const f = item.benefit.eligibility.filter(item => item.isEligible === true)
    return f.length === item.benefit.eligibility.length
  })

  const n = eligibility.filter(item => {
    const f = item.benefit.eligibility.filter(item => item.isEligible === false)
    return f.length > 0
  })

  const m = eligibility.filter(item => {
    const f = item.benefit.eligibility.filter(item => item.isEligible !== false)
    return f.length > 0
  })

  expect(e.length).toBe(4)
  expect(n.length).toBe(26)
  expect(m.length - e.length - n.length).toBe(1)

  await screen.findAllByTestId('benefit')
  expect(view.baseElement).toMatchSnapshot()
})
