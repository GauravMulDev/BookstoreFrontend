



describe("BookCard Component", () => {
  const mockBook = {
    title: "Sample Book",
    author: "John Doe",
    description: "A very interesting book.",
    price: 19.99,
    rating: 4
  };

  beforeEach(() => {
    cy.intercept('GET', '/api/check-auth', { authenticated: true });

    window.localStorage.setItem('isAuthenticated', 'true');

    cy.visit("http://localhost:3001/");
  
  });

  it("should display a truncated title", () => {
    cy.contains("Sam...").should("be.visible");
  });

  // it("should display a truncated author name", () => {
  //   cy.contains("Joh...").should("be.visible");
  // });

  // it("should display a truncated description", () => {
  //   cy.contains("A ve...").should("be.visible");
  // });

  // it("should display the correct price", () => {
  //   cy.contains("Price: $19.99").should("be.visible");
  // });

  // it("should display the correct rating with icons", () => {
  //   cy.get("svg[role='img']").should("have.length", 4); 
  // });

  // it("should contain the 'Add to Cart' button", () => {
  //   cy.get("button")
  //     .contains("Add to Cart")
  //     .should("be.visible");
  // });

  // it("should contain an image for the book", () => {
  //   cy.get("img").should("be.visible");
  // });


  // it("should call onAddToCart when 'Add to Cart' button is clicked", () => {
  //   const onAddToCart = cy.stub();
  //   mount(<BookCard book={mockBook} onAddToCart={onAddToCart} />);
  //   cy.get("button")
  //     .contains("Add to Cart")
  //     .click()
  //     .then(() => {
  //       expect(onAddToCart).to.have.been.calledOnce;
  //     });
  // });

  // it("should display the Offer tag for every 4th book", () => {
  //   cy.get("div")
  //     .contains("Offer")
  //     .should("be.visible");
  // });
});
