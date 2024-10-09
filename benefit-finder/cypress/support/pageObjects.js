/// <reference types="Cypress" />

class PageObjects {
  button() {
    return cy.get('.usa-button')
  }

  stepIndicator() {
    return cy.get('.usa-step-indicator')
  }

  benefitMemorableDate() {
    return cy.get('[data-testid="bf-usa-memorable-date"]')
  }

  applicantDateOfBirthMonth() {
    return this.benefitMemorableDate().find('[data-testid="month"]')
  }

  applicantDateOfBirthDay() {
    return this.benefitMemorableDate().find('[data-testid="day"]')
  }

  applicantDateOfBirthYear() {
    return this.benefitMemorableDate().find('[data-testid="year"]')
  }

  applicantDateOfDeathMonth() {
    return this.benefitMemorableDate().find('[data-testid="month"]')
  }

  applicantDateOfDeathDay() {
    return this.benefitMemorableDate().find('[data-testid="day"]')
  }

  applicantDateOfDeathYear() {
    return this.benefitMemorableDate().find('[data-testid="year"]')
  }

  applicantDateOfFuneralMonth() {
    return this.benefitMemorableDate().find('[data-testid="month"]')
  }

  applicantDateOfFuneralDay() {
    return this.benefitMemorableDate().find('[data-testid="day"]')
  }

  applicantDateOfFuneralYear() {
    return this.benefitMemorableDate().find('[data-testid="year"]')
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

  fieldset() {
    return cy.get('[data-testid="fieldset"]')
  }

  fieldsetById(id) {
    return this.fieldset().find(`[id*="${id}"]`)
  }

  radioButtonById(id) {
    return this.fieldset().find(`[id*="${id}"]`)
  }

  modalButtonGroup() {
    return cy.get('[data-testid="modal-button-group"]')
  }

  accordionHeading() {
    return cy.get('[data-testid="accordion-heading"]')
  }

  accordion() {
    return cy.get('[data-testid="benefit"]')
  }

  accordionByTitle(title) {
    return this.accordionHeading().contains(new RegExp(`^${title}$`))
  }

  benefitsAccordionLink(title) {
    return this.accordionHeading()
      .contains(new RegExp(`^${title}$`))
      .parent()
      .parent()
      .parent()
      .find('a[data-testid="bf-benefit-link"]')
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

  stepBackLink() {
    return cy.get('[data-testid="bf-step-back-button"]')
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
