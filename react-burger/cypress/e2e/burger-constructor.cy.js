
describe("test auth", () => {
  const email = "pozhidaevmasgmk@yandex.ru";
  const password = "admin123";
  const localUrl = "http://localhost:3000";

  before(() => {
    cy.visit(`${localUrl}/login`);
    cy.get('input[type=email]').click().type(`${email}`);
    cy.get('input[type=password]').click().type(`${password}`);
    cy.contains('Войти').click();
  });
  

  it('should d&d and order', () => {
    cy.get('[data-testid=bun]').contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('[data-testid=constructor-bun-top]').trigger('drop');

    cy.get('[data-testid=main]').contains('Плоды Фалленианского дерева').trigger('dragstart');
    cy.get('[data-testid=constructor-ingredients]').trigger('drop');
    cy.get('[data-testid=main]').contains('Плоды Фалленианского дерева').trigger('dragstart');
    cy.get('[data-testid=constructor-ingredients]').trigger('drop');

    cy.contains('Оформить заказ').click();
    cy.wait(20000);
    cy.get('[data-testid=close-window]').click();
  });
});
