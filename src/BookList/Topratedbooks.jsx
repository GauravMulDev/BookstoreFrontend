import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import BookCard from "../Bookcard/Bookcard";
import "./TopRatedBooks.css";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import "../App.css";
function TopRatedBooks({ onAddToCart, book }) {
  const [fourStarBooks, setFourStarBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fetchFourStarBooks = async () => {
    const token = localStorage.getItem("jwtToken");
    

    try {
      const response = await axios.post(
        "http://localhost:3000/books/filter",
        { rating: "4" }
        
      );
      setFourStarBooks(response.data);
    } catch (error) {
      console.error("Error fetching 4 star books:", error);
    }
  };

  useEffect(() => {
    fetchFourStarBooks();
  }, []);

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(prev + 1, fourStarBooks.length - 4));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <Button
        variant="outlined"
        onClick={scrollLeft}
        disabled={currentIndex === 0}
        style={{ marginRight: "1rem", flexShrink: 0 }}
      >
        <NavigateBeforeRoundedIcon />
      </Button>

      <div
        style={{
          display: "flex",
          width: "calc(100% - 100px)",
          justifyContent: "space-between",
          overflowX: "hidden",
          padding: "2px"
        }}
      >
        {fourStarBooks
          .slice(currentIndex, currentIndex + 4)
          .map((book, index) => (
            <div
              style={{
                flex: "1",
                flexShrink: 0,
                padding: "0",
                margin: "0 5px"
              }}
            >
              <BookCard
                book={book}
                index={index}
                onAddToCart={onAddToCart}
                key={book.id}
              />
            </div>
          ))}
      </div>

      <Button
        variant="outlined"
        onClick={scrollRight}
        disabled={currentIndex >= fourStarBooks.length - 4}
        style={{ marginLeft: "1rem", marginLeft: "1rem", flexShrink: 0 }}
      >
        <NavigateNextRoundedIcon />
      </Button>
    </div>
  );
}

export default TopRatedBooks;
