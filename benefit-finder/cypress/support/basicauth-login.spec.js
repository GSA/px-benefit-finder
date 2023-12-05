// your_spec.js
// your_spec.js

describe('Basic Auth Test with cy.visit()', () => {
    it('should authenticate with Basic Auth using cy.visit()', () => {
      const username = $storybook_username;
      const password = $storybook_password;
      const url = $CYPRESS_baseUrl;
  
      cy.visit(url, {
        onBeforeLoad(win) {
          // Set Basic Auth headers
          const credentials = btoa(`${username}:${password}`);
          win.XMLHttpRequest = () => {
            const xhr = new win.XMLHttpRequest();
            xhr.setRequestHeader('Authorization', `Basic ${credentials}`);
            return xhr;
          };
        },
      });
  
      // Add your assertions here
    });
  });

