/// <reference types="Cypress" />

class PageObjects {
  button() {
    return cy.get('.usa-button')
  }

  stepIndicator() {
    return cy.get('.usa-step-indicator')
  }

  applicantDateOfBirthMonth() {
    return cy.get('#applicant_date_of_birth_0_month')
  }

  applicantDateOfBirthDay() {
    return cy.get('#applicant_date_of_birth_0_day')
  }

  applicantDateOfBirthYear() {
    return cy.get('#applicant_date_of_birth_0_year')
  }

  applicantDateOfDeathMonth() {
    return cy.get('#deceased_date_of_death_0_month')
  }

  applicantDateOfDeathDay() {
    return cy.get('#deceased_date_of_death_0_day')
  }

  applicantDateOfDeathYear() {
    return cy.get('#deceased_date_of_death_0_year')
  }

  applicantDateOfFuneralMonth() {
    return cy.get('#deceased_date_of_funeral_0_month')
  }

  applicantDateOfFuneralDay() {
    return cy.get('#deceased_date_of_funeral_0_day')
  }

  applicantDateOfFuneralYear() {
    return cy.get('#deceased_date_of_funeral_0_year')
  }

  benefitSectionAlert() {
    return cy.get('div#bf-section > div[role="alert"]')
  }

  alertHeading() {
    return cy.get('[data-testid="bf-alert-heading"]')
  }

  bfAlertList() {
    return cy.get('[data-testid="bf-errors-list"]')
  }

  bfAlertListItem() {
    return cy.get('[data-testid="bf-errors-list-item"]')
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
    return cy.get(`[data-test-accordion-title="${heading}"]`)
  }

  benefitsAccordion() {
    return cy.get('.usa-accordion__button')
  }

  benefitsAccordionLink(accordionHeading) {
    return cy.get(
      `[data-test-accordion-title="${accordionHeading}"] a[data-testid="bf-benefit-link"]`
    )
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
    return cy.get('[data-testid="bf-result-view-unmet-button"]')
  }

  dateOfBirthError() {
    return cy.get('[data-testid="error-description-applicant_date_of_birth"]')
  }

  dateOfBirthMonthError() {
    return cy.get(
      '[data-testid="month-error-description-applicant_date_of_birth_0"]'
    )
  }

  dateOfBirthDayError() {
    return cy.get(
      '[data-testid="day-error-description-applicant_date_of_birth_0"]'
    )
  }

  dateOfBirthYearError() {
    return cy.get(
      '[data-testid="year-error-description-applicant_date_of_birth_0"]'
    )
  }

  relationshipToDeceasedError() {
    return cy.get(
      '[data-testid="error-description-applicant_relationship_to_the_deceased"]'
    )
  }

  zeroBenefitsViewHeading() {
    return cy.get('[data-testid="zero-benefits-view-heading"]')
  }

  seeAllBenefitsButton() {
    return cy.get('[data-testid="zero-benefits-view-cta-button"]')
  }
}

export const pageObjects = new PageObjects()
