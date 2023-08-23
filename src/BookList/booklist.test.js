
import { useQuery } from "react-query";



jest.mock("axios");
jest.mock("react-query");

describe("BookList Component", () => {
  beforeEach(() => {
    useQuery.mockReset();
  });

  //   it("renders without crashing", () => {
  //     useQuery.mockReturnValue({
  //       data: [],
  //       isError: false,
  //       isLoading: false
  //     });
  //     render(<BookList />);
  //   });

  //   it("displays loading state", () => {
  //     useQuery.mockReturnValue({
  //       data: undefined,
  //       isError: false,
  //       isLoading: true
  //     });
  //     render(<BookList />);
  //     expect(screen.getByText("Loading...")).toBeInTheDocument();
  //   });

  //   it("displays fetched books", async () => {
  //     const mockBooks = [
  //       { id: "1", title: "Test Book 1" },
  //       { id: "2", title: "Test Book 2" }
  //     ];
  //     useQuery.mockReturnValue({
  //       data: mockBooks,
  //       isError: false,
  //       isLoading: false
  //     });
  //     render(<BookList />);
  //     await waitFor(() => {
  //       expect(screen.getByText("Test Book 1")).toBeInTheDocument();
  //       expect(screen.getByText("Test Book 2")).toBeInTheDocument();
  //     });
  //   });

  //   it("handles pagination", async () => {
  //     const mockBooks = Array(10)
  //       .fill()
  //       .map((_, idx) => ({
  //         id: String(idx + 1),
  //         title: `Test Book ${idx + 1}`
  //       }));
  //     useQuery.mockReturnValue({
  //       data: mockBooks,
  //       isError: false,
  //       isLoading: false
  //     });
  //     render(<BookList />);
  //     const pagination = screen.getByRole("pagination");
  //     expect(pagination).toBeInTheDocument();

  //     // Additional behavior like clicking to navigate pages can be added here
  //   });

  //   it("handles error state", () => {
  //     useQuery.mockReturnValue({
  //       data: undefined,
  //       isError: true,
  //       isLoading: false
  //     });
  //     render(<BookList />);
  //     expect(screen.getByText("Error loading books.")).toBeInTheDocument();
  //   });
});
