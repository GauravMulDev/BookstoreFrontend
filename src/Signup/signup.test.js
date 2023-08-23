// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { createMemoryHistory } from "history";
// import { Router } from "react-router-dom";
// import Signup from "./Signup";
// import axios from "axios";

// jest.mock("axios");

// describe("Signup component", () => {
//   const history = createMemoryHistory();

//   beforeEach(() => {
//     render(
//       <Router history={history}>
//         <Signup />
//       </Router>
//     );
//   });

//   //   it("renders Signup component without crashing", () => {
//   //     expect(screen.getByText(/Create account/i)).toBeInTheDocument();
//   //   });

//   //   it("updates state on input change", () => {
//   //     userEvent.type(screen.getByLabelText(/Your name/i), "TestUser");
//   //     userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
//   //     userEvent.type(screen.getByLabelText(/Password/i), "password123");
//   //     userEvent.type(screen.getByLabelText(/Enter Mobile Number/i), "1234567890");

//   //     expect(screen.getByLabelText(/Your name/i).value).toBe("TestUser");
//   //     expect(screen.getByLabelText(/Email/i).value).toBe("test@example.com");
//   //     expect(screen.getByLabelText(/Password/i).value).toBe("password123");
//   //     expect(screen.getByLabelText(/Enter Mobile Number/i).value).toBe(
//   //       "1234567890"
//   //     );
//   //   });

//   //   it("Create your BookStore account button is enabled only when all fields are filled", () => {
//   //     const button = screen.getByText(/Create your BookStore account/i);
//   //     expect(button).toBeDisabled();

//   //     userEvent.type(screen.getByLabelText(/Your name/i), "TestUser");
//   //     userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
//   //     userEvent.type(screen.getByLabelText(/Password/i), "password123");
//   //     userEvent.type(screen.getByLabelText(/Enter Mobile Number/i), "1234567890");

//   //     expect(button).toBeEnabled();
//   //   });

//   //   it("navigates to login on Sign-In button click", () => {
//   //     const signInBtn = screen.getByText(/Sign-In/i);
//   //     userEvent.click(signInBtn);
//   //     expect(history.location.pathname).toBe("/login");
//   //   });

//   //   it("sends request to signup API on Create your BookStore account button click", async () => {
//   //     const mockedResponse = { data: { message: "User created successfully" } };
//   //     axios.post.mockResolvedValueOnce(mockedResponse);

//   //     userEvent.type(screen.getByLabelText(/Your name/i), "TestUser");
//   //     userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
//   //     userEvent.type(screen.getByLabelText(/Password/i), "password123");
//   //     userEvent.type(screen.getByLabelText(/Enter Mobile Number/i), "1234567890");

//   //     const button = screen.getByText(/Create your BookStore account/i);
//   //     userEvent.click(button);

//   //     expect(axios.post).toHaveBeenCalledWith(
//   //       "http://localhost:3000/auth/signup",
//   //       {
//   //         username: "TestUser",
//   //         email: "test@example.com",
//   //         password: "password123",
//   //         mobileNo: "1234567890"
//   //       }
//   //     );
//   //   });
// });
