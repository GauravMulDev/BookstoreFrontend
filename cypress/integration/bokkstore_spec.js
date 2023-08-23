

describe("Bookstore App Integration Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("redirects to login if not authenticated", () => {
    cy.url().should("include", "/login");
  });

  it("can login and logout", () => {
    cy.get('[data-testid="usernameInput"]').type("testuser");
    cy.get('[data-testid="passwordInput"]').type("password123");
    cy.get('[data-testid="loginButton"]').click();

    cy.contains("Bookstore").should("be.visible");

   
    cy.get('[data-testid="logoutButton"]').click();
    cy.url().should("include", "/login");
  });

  it("navigates correctly", () => {
    cy.contains("Home").click();
 

    cy.contains("Admin").click();
   
  });

  it("adds and removes books from cart", () => {
 
    cy.contains("Home").click();

    cy.get('[data-testid="addToCartButton"]')
      .first()
      .click();

    cy.contains("Cart").click();

  
    cy.get('[data-testid="cartItem"]').should("have.length", 1);


    cy.get('[data-testid="removeFromCartButton"]')
      .first()
      .click();
    cy.get('[data-testid="cartItem"]').should("have.length", 0);
  });

});
