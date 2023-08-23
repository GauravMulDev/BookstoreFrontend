import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "./Searchbar";

describe("SearchBar", () => {
  it("renders all input fields and buttons", () => {
    render(
      <SearchBar filters={{}} onFilterChange={jest.fn()} onSearch={jest.fn()} />
    );

    expect(screen.getByLabelText("Search by title")).toBeInTheDocument();
    expect(screen.getByLabelText("Search by author")).toBeInTheDocument();

    // Simulate a click on the <Select> dropdown button
    fireEvent.mouseDown(
      screen.getByRole("button", { expanded: false, haspopup: "listbox" })
    );

    // Now, the dropdown should be open and we can check for the "None" text
    expect(screen.getByText("None")).toBeInTheDocument();

    expect(screen.getByLabelText("Min Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Max Price")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  //   it("calls onFilterChange with correct parameters when input values change", () => {
  //     const mockOnFilterChange = jest.fn();
  //     const mockOnSearch = jest.fn();

  //     render(
  //       <SearchBar
  //         filters={{}}
  //         onFilterChange={mockOnFilterChange}
  //         onSearch={mockOnSearch}
  //       />
  //     );

  //     fireEvent.change(screen.getByLabelText("Search by title"), {
  //       target: { value: "React" }
  //     });
  //     expect(mockOnFilterChange).toHaveBeenCalledWith("title", "React");

  //     fireEvent.change(screen.getByLabelText("Search by author"), {
  //       target: { value: "Dan Abramov" }
  //     });
  //     expect(mockOnFilterChange).toHaveBeenCalledWith("author", "Dan Abramov");

  //     // Open the dropdown for "Filter by rating"
  //     fireEvent.mouseDown(
  //       screen.getByRole("button", { name: /Filter by rating/ })
  //     );

  //     // Select the desired rating (5 stars in this case)
  //     fireEvent.click(screen.getByText("5 Stars"));

  //     fireEvent.change(screen.getByLabelText("Min Price"), {
  //       target: { value: "10" }
  //     });
  //     expect(mockOnFilterChange).toHaveBeenCalledWith("minPrice", "10");

  //     fireEvent.change(screen.getByLabelText("Max Price"), {
  //       target: { value: "100" }
  //     });
  //     expect(mockOnFilterChange).toHaveBeenCalledWith("maxPrice", "100");
  //   });

  it("calls onSearch when search button is clicked", () => {
    const mockOnFilterChange = jest.fn();
    const mockOnSearch = jest.fn();

    render(
      <SearchBar
        filters={{}}
        onFilterChange={mockOnFilterChange}
        onSearch={mockOnSearch}
      />
    );

    fireEvent.click(screen.getByText("Search"));
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
