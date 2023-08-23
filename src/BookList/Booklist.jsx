import { useQuery } from "react-query";
import axios from "axios";
import BookCard from "../Bookcard/Bookcard";
import { Grid, Box, Typography } from "@mui/material";
import TopRatedBooks from "./Topratedbooks";
import Pagination from "@mui/material/Pagination";
import React, { useState, useEffect } from "react";
import { fetchBooks } from "../Services/service";
function BookList({ searchTerm = {}, hasSearched, onAddToCart, books }) {
  const [page, setPage] = useState(1);
  const [booksPerPage] = useState(5);
  const fetchBooks = async hasSearched => {
 
    
    if (!hasSearched) {
      const data = await fetchBooks(hasSearched);
    }

  
    return books;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const { data: fetchedBooks = [], isError, isLoading } = useQuery(
    ["books", books],
    () => fetchBooks(books),
    {
    
      enabled: !books.length || hasSearched 
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading books.</div>;
  }

  return (
    <Box p={2}>
      {" "}
      {/* p={2} adds padding */}
      <Box mb={3}>
        {" "}
        {/* mb={3} gives margin-bottom */}
        <TopRatedBooks books={books} onAddToCart={onAddToCart} />
      </Box>
      {Object.values(searchTerm).some(Boolean) ? (
        <Typography variant="h6" gutterBottom>
          Showing filtered results
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom>
          Showing all books
        </Typography>
      )}
      <Grid container spacing={2}>
        {fetchedBooks.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard
              key={book.id}
              index={index}
              book={book}
              onAddToCart={onAddToCart}
            />
          </Grid>
        ))}
      </Grid>{" "}
      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(fetchedBooks.length / booksPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default BookList;
