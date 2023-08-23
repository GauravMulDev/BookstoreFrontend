// describe("Login Tests", () => {
//   beforeEach(() => {
//     // Visiting our app before each test
//     cy.visit("http://localhost:3000/login"); 
//   });

//   it("should render login form", () => {
//     cy.get("[data-testid=usernameInput]").should("be.visible");
//     cy.get("[data-testid=passwordInput]").should("be.visible");
//     cy.get("[data-testid=loginButton]").should("be.visible");
//   });

//   it("should login with valid credentials", () => {
//     // Simulating user typing their credentials
//     cy.get("[data-testid=usernameInput]").type("testUser@example.com"); // Example username
//     cy.get("[data-testid=passwordInput]").type("testPassword123"); // Example password

//     // Clicking the login button
//     cy.get("[data-testid=loginButton]").click();

//     // Check if navigation occurred to the correct page
//     cy.url().should("eq", "http://localhost:3000/"); 
//   });

//   it("should show an error with invalid credentials", () => {
//     // Simulating user typing their credentials
//     cy.get("[data-testid=usernameInput]").type("invalidUser@example.com"); 
//     cy.get("[data-testid=passwordInput]").type("invalidPassword123"); 

//     // Clicking the login button
//     cy.get("[data-testid=loginButton]").click();

//     // Assuming you display some error message on invalid credentials
//     // You might want to add a data-testid to your error message container
//     cy.get("[data-testid=errorMessage]").should("be.visible");
//   });

//   it("should navigate to signup when Create your Book Store account is clicked", () => {
//     // Clicking the signup button
//     cy.get("[data-testid=signUpButton]").click();

//     // Check if navigation occurred to the signup page
//     cy.url().should("eq", "http://localhost:3000/signup");
//   });
// });
