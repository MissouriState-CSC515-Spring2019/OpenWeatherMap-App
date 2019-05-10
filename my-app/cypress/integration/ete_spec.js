describe("ETE Test", () => {
    it("Visit Weather App Page and clicks on forecast", () => {
      cy.visit("http://localhost:3000");
      cy.contains('5 Day Forecast').click();
        cy.url().should("include", "/forecast/65810");
    });
  });