describe("Login Tests", () => {
  beforeEach(() => {

    cy.visit("http://localhost:3001/login");
  });

  it("should render login form", () => {
    cy.get("[data-testid=usernameInput]").should("be.visible");
    cy.get("[data-testid=passwordInput]").should("be.visible");
    cy.get("[data-testid=loginButton]").should("be.visible");
  });

  it("should login with valid credentials", () => {
   
    cy.get("[data-testid=usernameInput]").type("testUser@example.com"); 
    cy.get("[data-testid=passwordInput]").type("testPassword123"); 

   
    cy.get("[data-testid=loginButton]").click();

   
    cy.url().should("eq", "http://localhost:3001/login"); 
  });

  it("should show an error with invalid credentials", () => {
  
    cy.get("[data-testid=usernameInput]").type("invalidUser@example.com"); 
    cy.get("[data-testid=passwordInput]").type("invalidPassword123"); 

    
    cy.get("[data-testid=loginButton]").click();

   
  });

  it("should navigate to signup when Create your Book Store account is clicked", () => {
   
    cy.get("[data-testid=signUpButton]").click();

    cy.url().should("eq", "http://localhost:3001/signup");
  });
});
