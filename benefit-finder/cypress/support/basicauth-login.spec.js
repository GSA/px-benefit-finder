// your_spec.js

describe('Basic Auth Test', () => {
    it('should authenticate with Basic Auth', () => {
      // If using the Cypress Credentials Plugin
      cy.getCredentials('yourWebsite').then(credentials => {
        const { username, password } = credentials;
  
        // Perform Basic Auth using cy.request
        cy.request({
          method: 'GET',
          url: $baseUrl,
          auth: {
            $authUsername,
            $authPassword,
          },
        }).then(response => {
          // Validate that the request was successful
          expect(response.status).to.eq(200);
  
          // Add your additional assertions if needed
        });
      });
    });
  });