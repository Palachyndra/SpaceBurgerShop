const localUrl = "http://localhost:3000";

describe("test auth", () => {
  const email = "pozhidaevmasgmk@yandex.ru";
  const password = "admin123";
  // before(() => {
  //   cy.visit("http://localhost:3000/login");
  //   cy.get('input[type=email]').click().type(`${email}`);
  //   cy.get('input[type=password]').click().type(`${password}`);
  //   cy.contains('Войти').click();
  // });
  
  it("mainpage D&D", () => {
    // cy.get('button').contains('Войти').click();
    // cy.wait(4000);
    cy.visit("http://localhost:3000");
  })

});