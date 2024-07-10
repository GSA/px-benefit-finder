import * as utils from '../../support/utils'
import * as BENEFITS_ELIBILITY_DATA from '../../fixtures/benefits-eligibility.json'

const localePaths = {
  en: [
    { key: 'death-of-a-loved-one', path: 'death' },
    { key: 'retirement', path: 'retirement' },
    { key: 'disability', path: 'disability' },
  ],
  es: [
    { key: 'death-of-a-loved-one', path: 'muerte' },
    { key: 'retirement', path: 'jubilacion' },
    { key: 'disability', path: 'discapacidad' },
  ],
}

const handlerequest = ({ testLink, link }) => {
  const url = testLink || link.prop('href')
  return cy
    .request({
      url,
      failOnStatusCode: false,
    })
    .then(response => {
      if (response.status === 200) {
        expect(response.status).to.eq(200)
      } else if (response.status === 403) {
        cy.get('body').children().its('length').should('be.gt', 0)
      } else if (response.status === 503) {
        throw new Error(`site down - gave a 503 ${url}`)
      } else if (response.status === 404) {
        throw new Error(`page not found - gave a 404 ${url}`)
      } else {
        cy.get('body').children().its('length').should('be.gt', 0)
      }
    })
}

const validateErrorCodes = test => {
  // we verify site is alive and fail on 404 || 503
  cy.get('#benefit-finder a[href]').each(link => {
    handlerequest({ link })
  })
}

const validateLinks = ({ selectedData, path }) => {
  const scenario = utils.encodeURIFromObject(selectedData)
  cy.visit(`${path}?${scenario}`)
  validateErrorCodes()
}

// to be removed when uncaught exceptions are addressed
Cypress.on('uncaught:exception', (error, runnable) => {
  console.log(error)
  return false
})

describe('Verify correct status code handling', () => {
  // negate validation on our functional code
  Cypress.on('fail', (error, runnable) => {
    if (JSON.stringify(error).includes('httpstat')) {
      expect(error).to.not.be.undefined
    } else {
      throw error
    }
  })

  it(`handles 404 with an error`, () => {
    handlerequest({ testLink: 'https://httpstat.us/404' })
  })

  it(`handles 503 with an error`, () => {
    handlerequest({ testLink: 'https://httpstat.us/503' })
  })

  it(`handles 200 successfully`, () => {
    handlerequest({ testLink: 'https://httpstat.us/200' })
  })

  it(`handles any 403 successfully`, () => {
    handlerequest({ testLink: 'https://httpstat.us/403' })
  })

  it(`handles any other request successfully`, () => {
    handlerequest({ testLink: 'https://httpstat.us/201' })
  })
})

describe('Verify correct status code when user navigates links in each locales', () => {
  localePaths.en.forEach(location => {
    it(`Verify success status code response for links in ${location.key} en page`, () => {
      validateLinks({
        selectedData: BENEFITS_ELIBILITY_DATA[`${location.key}`].en.param,
        path: `benefit-finder/${location.path}`,
      })
    })
  })

  localePaths.es.forEach(location => {
    it(`Verify success status code response for links in ${location.key} es page`, () => {
      validateLinks({
        selectedData: BENEFITS_ELIBILITY_DATA[`${location.key}`].en.param,
        path: `es/buscador-beneficios/${location.path}`,
      })
    })
  })
})
