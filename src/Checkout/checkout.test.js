import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkout from "./Checkout.jsx";

describe("<Checkout />", () => {
  const mockCartItems = [
    {
      _id: "1",
      title: "Mock Book 1",
      price: 10,
      quantity: 2
    },
    {
      _id: "2",
      title: "Mock Book 2",
      price: 20,
      quantity: 1
    }
  ];

  //   it("renders without crashing", () => {
  //     render(<Checkout cartItems={mockCartItems} />);
  //     expect(screen.getByLabelText("Card Number")).toBeInTheDocument();
  //   });

  //   it("formats card number correctly", () => {
  //     render(<Checkout cartItems={mockCartItems} />);
  //     const input = screen.getByLabelText("Card Number");
  //     fireEvent.change(input, { target: { value: "1234567812345678" } });
  //     expect(input.value).toBe("1234-5678-1234-5678");
  //   });

  //   it("formats expiry date correctly", () => {
  //     render(<Checkout cartItems={mockCartItems} />);
  //     const input = screen.getByLabelText("Expiry Date");
  //     fireEvent.change(input, { target: { value: "1224" } });
  //     expect(input.value).toBe("12/24");
  //   });

  //   it("toggles CVV visibility", () => {
  //     render(<Checkout cartItems={mockCartItems} />);
  //     const input = screen.getByLabelText("CVV");
  //     const visibilityButton = screen.getByRole("button");
  //     expect(input.type).toBe("password"); // Initial type
  //     fireEvent.click(visibilityButton);
  //     expect(input.type).toBe("text"); // After toggle
  //   });

  //   it("displays receipt after confirming payment", () => {
  //     render(<Checkout cartItems={mockCartItems} />);
  //     const confirmButton = screen.getByText("Confirm Payment");
  //     fireEvent.click(confirmButton);
  //     expect(screen.getByText("Bookstore Payment Receipt")).toBeInTheDocument();
  //   });

  //   it("renders download button after payment", () => {
  //     render(<Checkout cartItems={mockCartItems} />);
  //     const confirmButton = screen.getByText("Confirm Payment");
  //     fireEvent.click(confirmButton);
  //     expect(screen.getByText("Download as PDF")).toBeInTheDocument();
  //   });
});
