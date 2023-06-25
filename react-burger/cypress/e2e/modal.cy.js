
describe('modal window', () => {
  it('mainpage open and close modal window', () => {
    cy.visit('/');
    cy.get('[data-testid=bun]').contains('Краторная булка N-200i').click();
    cy.get('[data-testid=close-window]').click();

    cy.get('[data-testid=bun]').contains('Краторная булка N-200i').click();
    cy.get('body').type('{esc}');
  })
})