/// <reference types="Cypress" />

class PageObjects {
  button() {
    return cy.get('.usa-button')
  }

  stepIndicator() {
    return cy.get('.bf-usa-step-indicator')
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
}

export const pageObjects = new PageObjects()
