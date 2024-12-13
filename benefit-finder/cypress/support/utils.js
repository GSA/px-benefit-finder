import { pageObjects } from '../support/pageObjects'
import * as EN_DOLO_MOCK_DATA from '../../../benefit-finder/src/shared/api/mock-data/current.json'

export function getDateByOffset(offset) {
  const date = new Date(Date.now())
  const n = Number(offset)

  date.setDate(date.getDate() + n)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const monthName = date.toLocaleString('default', { month: 'long' })
  const day = ('0' + date.getDate()).slice(-2)
  const year = date.getFullYear()

  return { month: month + ' - ' + monthName, day, year }
}

// encoder utility
export const encodeURIFromObject = obj => {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${
          typeof value === 'object'
            ? encodeURIComponent(JSON.stringify(value)) // handles date objects
            : encodeURIComponent(value)
        }`
    )
    .join('&')
}

// can be used by all the test that are visiting in story mode
export const storybookUri = `/iframe.html?args=&id=app--primary&viewMode=story&`

export const dataInputs = ({ dob, relation, status, dod }) => {
  // input date of birth
  dob && cy.enterDate(dob.month, dob.day, dob.year)
  // input relation to deceased
  relation &&
    pageObjects
      .fieldsetById(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[1].fieldset.inputs[0].inputCriteria.id
      )
      .select(relation)
  // input marital status
  status &&
    pageObjects
      .fieldsetById(
        EN_DOLO_MOCK_DATA.data.lifeEventForm.sectionsEligibilityCriteria[0]
          .section.fieldsets[2].fieldset.inputs[0].inputCriteria.id
      )
      .select(status)
  // input date of death
  dod && cy.enterDate(dod.month, dod.day, dod.year)
}
