describe('modal window', () => {
  const localUrl = "http://localhost:3000";
  
  it('mainpage open and close modal window', () => {
    cy.visit(localUrl);
    cy.get('[data-testid=bun]').contains('Краторная булка N-200i').click();
    cy.get('[data-testid=close-window]').click();

    cy.get('[data-testid=bun]').contains('Краторная булка N-200i').click();
    cy.get('body').type('{esc}');
  })
})