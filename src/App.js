import React, { useState, useEffect } from "react";
import SearchBar from "./Searchbar/Searchbar.jsx";
import BookList from "./BookList/Booklist.jsx";
import ShoppingCart from "./Shoppingcart/Shoppingcart.jsx";
import Login from "./Login/Login.jsx";
import Signup from "./Signup/Signup.jsx";
import Checkout from "./Checkout/Checkout.jsx";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Face6RoundedIcon from "@mui/icons-material/Face6Rounded";
import BookIcon from "./Bookicon.js";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import AuthenticatedRoute from "./Routes/AuthenticatedRoutes.jsx";
import ImportExportComponent from "./importExport/importexport.jsx";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import logo from '../src/assets/logo.jpg'
import {
  Box,
  Container,
  Paper,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
  Button,
  Avatar,
  Slide
} from "@mui/material";
import { groupedItemsAtom } from "./Store/store.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate
} from "react-router-dom";
import "./transitionStyles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { Provider } from "jotai";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAtom } from "jotai";
import ErrorPage from "./Error/Errorpage.jsx";
import { fetchBooks,filterBooks } from "./Services/service.jsx";



const theme = createTheme({
  palette: {
    primary: {
      main: "#131921" 
    },
    secondary: {
      main: "#FFA41C" 
    },
    background: {
      default: "#EAEBED" 
    },
    text: {
      primary: "#333", 
      secondary: "#555" 
    }
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(",")
  }
});

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    price: "",
    description: ""
  });
  const isMenuOpen = Boolean(anchorEl);
  useEffect(() => {
   
    localStorage.clear();
  

    navigate("/login");
  }, []);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      if (Object.values(filters).some(value => !value)) {
       

        try {
          const booksData = await fetchBooks('1', '9', token); 
          setBooks(booksData);
        } catch (error) {
      
        } finally {
          setIsLoading(false); 
        }
      }
    }
    fetchData();
  }, [filters, token]);

  const handleAddToCart = book => {
    setCartItems(prevItems => {
      const existingBook = prevItems.find(item => item._id === book._id);

      if (existingBook) {
        return prevItems.map(item =>
          item._id === book._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price
              }
            : item
        );
      } else {
        return [...prevItems, { ...book, quantity: 1, total: book.price }];
      }
    });
  };
  const handleRemoveFromCart = bookToRemove => {
    setCartItems(prevItems => {
      const existingBook = prevItems.find(
        item => item._id === bookToRemove._id
      ); 

      if (existingBook && existingBook.quantity > 1) {
        return prevItems.map(item =>
          item._id === bookToRemove._id 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter(item => item._id !== bookToRemove._id); 
      }
    });
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
  
  

    setIsAuthenticated(false);
    handleMenuClose();
  
    navigate("/login");
  };
  const handleSearch = () => {
    setHasSearched(true);
    filterBooks(filters)
        .then(response => {
            setBooks(response.data);
        })
        .catch(error => {
            console.error("Error fetching filtered books:", error);
        });
};

  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <div className="app-background">
            {!isAuthPage && (
              <>
                <AppBar position="static" className="app-bar">
                  <Toolbar>
                    <Typography variant="h5" className="app-title">
                      Bookstore
                    </Typography>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/"
                      className="app-home-btn"
                    >
                      Home
                    </Button>
                  

                    <div style={{ flexGrow: 1 }}></div>
                    {location.pathname !== "/admin" && (
                      <IconButton
                        color="inherit"
                        component={Link}
                        to="/cart"
                        className="cart-icon-btn"
                      >
                        <Badge
                          badgeContent={cartItems.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                          )}
                          color="error"
                        >
                          <ShoppingCartIcon />
                        </Badge>
                      </IconButton>
                    )}
                    <Typography
                      variant="subtitle1"
                      className="user-name"
                      style={{ marginLeft: "24px" }}
                    >
                      {`Hi ${capitalizeFirstLetter(
                        localStorage.getItem("username") || ""
                      )}`}
                    </Typography>
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleMenuOpen}
                    >
                      <Avatar>
                        {/* You can replace the Face6RoundedIcon with any initials or user image */}
                        <LogoutRoundedIcon />
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      TransitionComponent={Slide}
                    >
                      {<MenuItem onClick={handleLogout}>Logout</MenuItem>}
                    </Menu>
                  </Toolbar>
                </AppBar>

                {location.pathname !== "/admin" &&
                  location.pathname !== "/checkout" &&
                  location.pathname !== "/cart" && (
                    <Paper className="search-bar-paper">
                      <SearchBar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onSearch={handleSearch}
                      />
                    </Paper>
                  )}
              </>
            )}

            <Container maxWidth="lg" className="container">
              <Routes>
                <Route path="/error" element={<ErrorPage />} />
                <Route
                  path="/"
                  element={
                    <BookList
                      onAddToCart={handleAddToCart}
                      searchTerm={searchTerm}
                      books={books}
                    />
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ImportExportComponent
                    
                    />
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ShoppingCart
                      cartItems={cartItems}
                      onRemoveFromCart={handleRemoveFromCart}
                    />
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <Checkout
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/error" replace />} />
              </Routes>
            </Container>
            {isLoading && (
              <div className="loader-container">
                <CircularProgress />
              </div>
            )}
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
