/// <reference types="Cypress" />

class PageObjects {
  button() {
    return cy.get('.usa-button')
  }

  benefitMemorableDate() {
    return cy.get('[data-testid="bf-usa-memorable-date"]')
  }

  benefitMemorableDateById(id) {
    return this.benefitMemorableDate().find(`[id$="${id}"]`)
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
    return this.fieldset().find(`[id^="${id}"]`)
  }

  modalButtonGroup() {
    return cy.get('[data-testid="modal-button-group"]')
  }

  accordionHeading() {
    return cy.get('[data-testid="accordion-heading"]')
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

  errorDescription() {
    return cy.get('[data-testid="error-description"]')
  }

  dateOfBirthMonthError() {
    return cy.get('[data-testid="month-error-description"]')
  }

  dateOfBirthDayError() {
    return cy.get('[data-testid="day-error-description"]')
  }

  dateOfBirthYearError() {
    return cy.get('[data-testid="year-error-description"]')
  }

  zeroBenefitsViewHeading() {
    return cy.get('[data-testid="zero-benefits-view-heading"]')
  }

  seeAllBenefitsButton() {
    return cy.get('[data-testid="zero-benefits-view-cta-button"]')
  }
}

export const pageObjects = new PageObjects()
