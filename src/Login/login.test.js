import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from "@testing-library/react";
import axios from "axios";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";


jest.mock("axios");

describe("<Login />", () => {
  beforeEach(() => {
  
    axios.post.mockResolvedValue({ data: {} });
  });

  it("renders without crashing", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const titleElement = screen.getByText(/BookStore Sign-In/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("updates username and password fields correctly", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const usernameField = screen.getByLabelText(
      /Email or mobile phone number/i
    );
    const passwordField = screen.getByLabelText(/Password/i);

    fireEvent.change(usernameField, { target: { value: "testuser" } });
    expect(usernameField.value).toBe("testuser");

    fireEvent.change(passwordField, { target: { value: "testpassword" } });
    expect(passwordField.value).toBe("testpassword");
  });

  // it("handles sign-in button click", async () => {
  //   axios.post.mockResolvedValue({
  //     data: {
  //       access_token: "token",
  //       role: "user",
  //       user: "testuser"
  //     }
  //   });
  //   render(<Login />, { wrapper: MemoryRouter });
  //   const buttons = screen.getByRole('button', { name: /Sign-In/i });

  //   // Now, wrap the fireEvent inside an asynchronous act
  //   await act(async () => {
  //     fireEvent.click(buttons);
  //   });

  //   const signInButton = buttons[1]; 
  //   fireEvent.click(signInButton);
  // });

  //  it('handles sign-in button click and shows error message', async () => { 
  //       const errorMessage = "Your mock error message"; 

  //       axios.post.mockRejectedValue(new Error(errorMessage));

  //       render(<Login />, { wrapper: MemoryRouter });

  //       const button = screen.getByText(/Sign-In/i);
  //       fireEvent.click(button);

  //       const errorElement = await screen.findByText(errorMessage); 
  //       expect(errorElement).toBeInTheDocument();
  //   });

  it("handles sign-in button click", async () => {
 
    axios.post.mockResolvedValueOnce({
      data: { token: "test_token", role: "user" }
    });

    render(<Login />, { wrapper: MemoryRouter });

    // Using the role of a button to specifically get the Sign-In button
    const signInButtons = screen.getAllByRole("button", { name: /Sign-In/i });

    // Just for safety
    if (signInButtons.length !== 1) {
      throw new Error("Expected only one Sign-In button.");
    }

    const signInButton = signInButtons[0];


    act(() => {
      fireEvent.click(signInButton);
    });

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  it("navigates to /signup on create account button click", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const createAccountButton = screen.getByText(
      /Create your Book Store account/i
    );
    fireEvent.click(createAccountButton);
    // Here, you'd typically mock the `navigate` function and check if it was called with `/signup`
  });

  //   it('handles login errors correctly', async () => {
  //     axios.post.mockRejectedValue(new Error('Failed to login'));
  //     render(<Login />, { wrapper: MemoryRouter });
  //     const button = screen.getByText(/Sign-In/i);
  //     fireEvent.click(button);

  //   });
});
