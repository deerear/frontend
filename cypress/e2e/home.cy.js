describe('Home Page', () => {
  it('should display the home page', () => {
    cy.visit('/');
    cy.get('div').should('contain', 'hello world');
  });
});
