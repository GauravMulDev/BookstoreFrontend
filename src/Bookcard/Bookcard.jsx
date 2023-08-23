import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid,
  CardMedia
} from "@mui/material";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function BookCard({ book, onAddToCart, index = 0 }) {
  const [bookImage, setBookImage] = useState(null);

  useEffect(() => {

    const imageIndex = (index % 10) + 1;

    const loadImage = extension => {
      return import(`../assets/image${imageIndex}.${extension}`)
        .then(image => {
          setBookImage(image.default);
         
          return true;
        })
        .catch(err => {
        
          return false;
        });
    };

    loadImage("jpg").then(success => {
      if (!success) {
        loadImage("jpeg");
      }
    });
  }, [index]);
  function truncateText(str = "", num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  const OfferTag = () => (
    <div
      style={{
        position: "absolute",
        backgroundColor: "red",
        color: "white",
        padding: "4px 8px",
        top: 0,
        right: 0,
        zIndex: 10 
      }}
    >
      Offer
    </div>
  );


  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={4} lg={6} xl={8}>
        <Card style={{ position: "relative" }}>
          {index % 4 === 0 && <OfferTag />}
          {bookImage && (
            <CardMedia
              component="img"
              alt={book.title}
              height="140"
              style={{ objectFit: "contain" }}
              image={bookImage}
            />
          )}
          <CardContent>
            <Typography variant="h5" component="div">
              {truncateText(book.title, 10)}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {truncateText(book.author, 10)}
            </Typography>
            <Typography variant="body2">
              {" "}
              {truncateText(book.description, 10)}
            </Typography>
            <Typography variant="body2">Price: ${book.price}</Typography>
            <Typography
              variant="body2"
              style={{ display: "flex", alignItems: "center" }}
            >
              Rating: {book.rating}
              {Array.from({ length: book.rating }).map((_, idx) => (
                <GradeRoundedIcon
                  key={idx}
                  style={{ color: "goldenrod", marginLeft: "4px" }}
                />
              ))}
            </Typography>
            <Button
              startIcon={<ShoppingCartIcon />}
              onClick={() => onAddToCart(book)}
              variant="contained"
              color="primary"
              style={{ marginTop: "8px" }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default BookCard;
