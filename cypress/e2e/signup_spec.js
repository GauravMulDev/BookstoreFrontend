describe("Signup Tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3000/books/booklist").as(
      "getBookList"
    );
    

    cy.intercept('GET', '/path-to-auth-check', { user: { authenticated: false } });

   
    cy.visit("http://localhost:3001/login");


    cy.get("[data-testid=signButton]", { timeout: 20000 }).click({ force: true });

    cy.url().should("include", "/signup");
    cy.get("[data-testid=usernameInput]", { timeout: 10000 }).should("be.visible");
    cy.wait("@getBookList");
  });
    

    

 

  it("should render the signup form", () => {
    cy.get("[data-testid=usernameInput]").should("be.visible");
    cy.get("[data-testid=emailInput]").should("be.visible");
    cy.get("[data-testid=passwordInput]").should("be.visible");
    cy.get("[data-testid=mobileNumberInput]").should("be.visible");
    cy.get("[data-testid=createaccountButton]").should("be.visible");
  });

  it("should allow user to create an account", () => {
    const username = "John Doe";
    const email = "john@example.com";
    const password = "Password123";
    const mobileNo = "1234567890";

    cy.get("[data-testid=usernameInput]").type(username);
    cy.get("[data-testid=emailInput]").type(email);
    cy.get("[data-testid=passwordInput]").type(password);
    cy.get("[data-testid=mobileNumberInput]").type(mobileNo);
    cy.get("[data-testid=createaccountButton]").click();
  });
});
  

