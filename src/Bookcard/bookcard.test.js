import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookCard from "./Bookcard.jsx";

describe("<BookCard />", () => {

  const mockBook = {
    title: "Lorem Ipsum Dolor Sit Amet",
    author: "John Doe",
    description: "A sample book description that is pretty long.",
    price: 10,
    rating: 3
  };

  it("renders without crashing", () => {
    render(<BookCard book={mockBook} index={0} />);
    expect(screen.getByText(/Lorem Ipsum/i)).toBeInTheDocument();
  });

  it("renders the OfferTag when index is a multiple of 4", () => {
    render(<BookCard book={mockBook} index={4} />);
    expect(screen.getByText("Offer")).toBeInTheDocument();
  });

  it("does not render the OfferTag when index is not a multiple of 4", () => {
    render(<BookCard book={mockBook} index={3} />);
    expect(screen.queryByText("Offer")).toBeNull();
  });

  it("truncates long text", () => {
    render(<BookCard book={mockBook} index={0} />);
    expect(screen.getByText(/Lorem.../i)).toBeInTheDocument();
    expect(screen.getByText(/John.../i)).toBeInTheDocument();
    expect(screen.getByText(/A sample.../i)).toBeInTheDocument();
  });

  it("calls onAddToCart when Add to Cart button is clicked", () => {
    const mockAddToCart = jest.fn();
    render(<BookCard book={mockBook} onAddToCart={mockAddToCart} index={0} />);
    fireEvent.click(screen.getByText(/Add to Cart/i));
    expect(mockAddToCart).toHaveBeenCalledWith(mockBook);
  });
});
