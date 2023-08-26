import React,{useEffect} from "react";
import { useLocation } from "react-router-dom";
import {
  TextField,
  Paper,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Box
} from "@mui/material";

const SearchBar = ({ filters, onFilterChange, onSearch }) => {

  const location = useLocation();

  useEffect(() => {
    // Reset filters when route changes
    onFilterChange('title', '');
    onFilterChange('author', '');
    onFilterChange('rating', '');
    onFilterChange('minPrice', '');
    onFilterChange('maxPrice', '');

    // Optionally, you can also trigger a search whenever filters are reset
    // onSearch();

  }, [location.pathname!=='/']);
  return(
  <Paper style={{ padding: "1rem", margin: "1rem 0" }}>
    <Box display="flex" justifyContent="space-between" flexWrap="nowrap">
      <TextField
        label="Search by title"
        variant="outlined"
        value={filters.title || ""}
        onChange={e => onFilterChange("title", e.target.value)}
        style={{ flex: 1, marginRight: "1rem" }}
      />

      <TextField
        label="Search by author"
        variant="outlined"
        value={filters.author || ""}
        onChange={e => onFilterChange("author", e.target.value)}
        style={{ flex: 1, marginRight: "1rem" }}
      />

      <FormControl variant="outlined" style={{ flex: 1, marginRight: "1rem" }}>
        <InputLabel>Filter by rating</InputLabel>
        <Select
          value={filters.rating || ""}
          onChange={e => onFilterChange("rating", e.target.value)}
          label="Filter by rating"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
          <MenuItem value={4}>4 Stars</MenuItem>
          <MenuItem value={5}>5 Stars</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Min Price"
        variant="outlined"
        type="number"
        value={filters.minPrice || ""}
        onChange={e => onFilterChange("minPrice", e.target.value)}
        style={{ flex: 1, marginRight: "1rem" }}
      />

      <TextField
        label="Max Price"
        variant="outlined"
        type="number"
        value={filters.maxPrice || ""}
        onChange={e => onFilterChange("maxPrice", e.target.value)}
        style={{ flex: 1, marginRight: "1rem" }}
      />

      <Button onClick={onSearch} style={{ fontWeight: "bold" }}>
        Search
      </Button>
    </Box>
  </Paper>
);}

export default SearchBar;
