/// <reference types="Cypress" />

class PageObjects {
  button() {
    return cy.get('.usa-button')
  }

  stepIndicator() {
    return cy.get('.usa-step-indicator')
  }

  applicantDateOfBirthMonth() {
    return cy.get('#date_of_birth_month-applicant_date_of_birth_0')
  }

  applicantDateOfBirthDay() {
    return cy.get('#date_of_birth_day-applicant_date_of_birth_0')
  }

  applicantDateOfBirthYear() {
    return cy.get('#date_of_birth_year-applicant_date_of_birth_0')
  }

  applicantDateOfDeathMonth() {
    return cy.get('#date_of_birth_month-deceased_date_of_death_0')
  }

  applicantDateOfDeathDay() {
    return cy.get('#date_of_birth_day-deceased_date_of_death_0')
  }

  applicantDateOfDeathYear() {
    return cy.get('#date_of_birth_year-deceased_date_of_death_0')
  }

  applicantDateOfFuneralMonth() {
    return cy.get('#date_of_birth_month-deceased_date_of_funeral_0')
  }

  applicantDateOfFuneralDay() {
    return cy.get('#date_of_birth_day-deceased_date_of_funeral_0')
  }

  applicantDateOfFuneralYear() {
    return cy.get('#date_of_birth_year-deceased_date_of_funeral_0')
  }

  benefitSectionAlert() {
    return cy.get('div#bf-section > div[role="alert"]')
  }

  dateAlert() {
    return cy.get('.bf-usa-date-alert')
  }

  applicantRelationshipToDeceased() {
    return cy.get('#applicant_relationship_to_the_deceased_0')
  }

  applicantMaritalStatus() {
    return cy.get('#applicant_marital_status_0')
  }

  benefitSectionFieldset() {
    return cy.get('#bf-section .usa-fieldset')
  }

  buttonGroup() {
    return cy.get('.usa-button-group li')
  }

  accordion(heading) {
    return cy.get(`[data-analytics-content="${heading}"]`)
  }

  benefitsAccordion() {
    return cy.get('.usa-accordion__button')
  }

  menuButton() {
    return cy.get('.usa-menu-btn')
  }

  mobileMenu() {
    return cy.get('.usagov-mobile-menu')
  }

  breadCrumbList() {
    return cy.get('.usa-breadcrumb__list')
  }

  cardGroup() {
    return cy.get('.usa-card-group li')
  }

  selectField() {
    return cy.get('main .bf-usa-select')
  }

  inputField() {
    return cy.get('main .usa-input')
  }

  radioGroup() {
    return cy.get('main .radio-group')
  }

  expandAll() {
    return cy.get('.bf-expand-all')
  }

  keyEligibilityCriteriaListIcon() {
    return cy.get('.usa-accordion .bf-usa-list svg')
  }

  benefitResultsView() {
    return cy.get('.bf-result-view')
  }

  notEligibleResultsButton() {
    return cy.get('.bf-result-view-unmet > .usa-button')
  }

  stepBackLink() {
    return cy.get('.bf-step-back-link')
  }

  zeroBenefitsViewHeading() {
    return cy.get('[data-testid="zero-benefits-view-heading"]')
  }

  seeAllBenefitsButton() {
    return cy.get('.bf-zero-benefits-view-cta .bf-usa-button')
  }
}

export const pageObjects = new PageObjects()
