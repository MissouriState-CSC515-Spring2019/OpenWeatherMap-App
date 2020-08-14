describe('My First Test', function() {
    it('Visits the weather app page and clicks on forecast link', function() {
      cy.visit('http://localhost:3000');
      cy.contains('5 Day Forecast').click();
      cy.url().should('include', '/forecast/65810')
    });
  });