describe('Basic Auth E2E Test', () => {
    it('should log in with basic auth', () => {
      // Retrieve username and password from environment variables
      const username = Cypress.env('CYPRESS_username');
      const password = Cypress.env('CYPRESS_password');
  
      // Construct the URL with basic authentication
      const urlWithAuth = `https://${username}:${password}@${Cypress.env('CYPRESS_baseUrl')}`;
  
      // Visit the website with basic auth
      cy.visit(urlWithAuth);
  
      // Add your Cypress test commands here
      // For example:
      cy.get('your-selector').should('contain', 'expected-text');
    });
  });
  