import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import { atom, Provider } from "jotai";
import { render as rtlRender } from "@testing-library/react";
import ShoppingCart from "./Shoppingcart";
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));
function renderWithRouter(ui) {
  return rtlRender(<Router>{ui}</Router>);
}
jest.mock("../Store/store.js", () => {
  return {
    ...jest.requireActual("../Store/store.js"),
    groupedItemsAtom: atom([])
  };
});

describe("ShoppingCart component", () => {
  const mockOnRemoveFromCart = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //   it("should show empty cart message if cart is empty", () => {
  //     render(
  //       <ShoppingCart cartItems={[]} onRemoveFromCart={mockOnRemoveFromCart} />
  //     );
  //     expect(
  //       screen.getByText("Your cart is empty, please add items")
  //     ).toBeInTheDocument();
  //   });

  //   it("should list items in cart if present", () => {
  //     const cartItems = [
  //       {
  //         _id: "1",
  //         image: "sample.jpg",
  //         title: "Test Item",
  //         description: "This is a test item",
  //         price: 100,
  //         quantity: 2,
  //         total: 200
  //       }
  //     ];
  //     render(
  //       <ShoppingCart
  //         cartItems={cartItems}
  //         onRemoveFromCart={mockOnRemoveFromCart}
  //       />
  //     );
  //     expect(screen.getByText("Test Item")).toBeInTheDocument();
  //     expect(screen.getByText("Price: $100")).toBeInTheDocument();
  //     expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
  //     expect(screen.getByText("Total: $200")).toBeInTheDocument();
  //   });

  //   it("should call onRemoveFromCart when Remove button is clicked", () => {
  //     const cartItems = [
  //       {
  //         _id: "1",
  //         image: "sample.jpg",
  //         title: "Test Item",
  //         description: "This is a test item",
  //         price: 100,
  //         quantity: 2,
  //         total: 200
  //       }
  //     ];
  //     render(
  //       <ShoppingCart
  //         cartItems={cartItems}
  //         onRemoveFromCart={mockOnRemoveFromCart}
  //       />
  //     );
  //     userEvent.click(screen.getByText("Remove"));
  //     expect(mockOnRemoveFromCart).toHaveBeenCalledTimes(1);
  //   });

  //   it("should navigate to checkout on clicking Proceed to Checkout", () => {
  //     const cartItems = [
  //       {
  //         _id: "1",
  //         image: "sample.jpg",
  //         title: "Test Item",
  //         description: "This is a test item",
  //         price: 100,
  //         quantity: 2,
  //         total: 200
  //       }
  //     ];
  //     useNavigate.mockReturnValue(jest.fn());
  //     render(
  //       <ShoppingCart
  //         cartItems={cartItems}
  //         onRemoveFromCart={mockOnRemoveFromCart}
  //       />
  //     );
  //     userEvent.click(screen.getByText("Proceed to Checkout"));
  //     expect(useNavigate()).toHaveBeenCalledTimes(1);
  //   });

  //   it("should navigate to homepage on clicking Continue Shopping", () => {
  //     const cartItems = [
  //       {
  //         _id: "1",
  //         image: "sample.jpg",
  //         title: "Test Item",
  //         description: "This is a test item",
  //         price: 100,
  //         quantity: 2,
  //         total: 200
  //       }
  //     ];

  //     const { history } = renderWithRouter(
  //       <ShoppingCart
  //         cartItems={cartItems}
  //         onRemoveFromCart={mockOnRemoveFromCart}
  //       />
  //     );
  //     const pushSpy = jest.spyOn(history, "push");
  //     userEvent.click(screen.getByText("Continue Shopping"));
  //     expect(pushSpy).toHaveBeenCalledWith("/");
  //   });
});
