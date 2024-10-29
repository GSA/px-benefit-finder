/// <reference types="cypress" />

class PageObjects {
  button() {
    return cy.get('.usa-button')
  }

  applicantDateOfBirthMonth() {
    return cy.get('[data-testid="applicant_date_of_birth_0_month"]')
  }

  applicantDateOfBirthDay() {
    return cy.get('[data-testid="applicant_date_of_birth_0_day"]')
  }

  applicantDateOfBirthYear() {
    return cy.get('[data-testid="applicant_date_of_birth_0_year"]')
  }

  applicantDateOfDeathMonth() {
    return cy.get('[data-testid="deceased_date_of_death_0_month"]')
  }

  applicantDateOfDeathDay() {
    return cy.get('[data-testid="deceased_date_of_death_0_day"]')
  }

  applicantDateOfDeathYear() {
    return cy.get('[data-testid="deceased_date_of_death_0_year"]')
  }

  applicantDateOfFuneralMonth() {
    return cy.get('[data-testid="deceased_date_of_funeral_0_month"]')
  }

  applicantDateOfFuneralDay() {
    return cy.get('[data-testid="deceased_date_of_funeral_0_day"]')
  }

  applicantDateOfFuneralYear() {
    return cy.get('[data-testid="deceased_date_of_funeral_0_year"]')
  }

  benefitSectionAlert() {
    return cy.get('[data-testid="alert"]')
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
    return cy.get('[data-testid="applicant_relationship_to_the_deceased_0"]')
  }

  applicantMaritalStatus() {
    return cy.get('[data-testid="applicant_marital_status_0"]')
  }

  benefitSectionFieldset() {
    return cy.get('[data-testid="fieldset"]')
  }

  benefitSectionFieldsetById(id) {
    return this.benefitSectionFieldset().filter(`#${id}`)
  }

  radioButtonById(id) {
    return this.benefitSectionFieldsetById(id).find('[data-testid="radio"]')
  }

  buttonGroup() {
    return cy.get('[data-testid="button-group"] li')
  }

  accordionByTitle(title) {
    return cy.get(`[data-test-accordion-title="${title}"]`)
  }

  accordion() {
    return cy.get('[data-testid="accordion-heading"]')
  }

  benefitsAccordionLink(title) {
    return this.accordionByTitle(title)
      .parent()
      .parent()
      .parent()
      .find('a[data-testid="bf-benefit-link"]')
  }

  keyEligibilityCriteriaList() {
    return cy.get('[data-testid="bf-key-eligibility-criteria-list"] li')
  }

  radioGroup() {
    return cy.get('[data-testid="radio-group"]')
  }

  expandAll() {
    return cy.get('[data-testid="bf-expand-all"]')
  }

  iconGreenCheck() {
    return cy.get('[data-testid="icon-green-check"]')
  }

  benefitResultsView() {
    return cy.get('[data-testid="bf-result-view"]')
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
