import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearchChange }) { // Receive the search term handler as a prop

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    console.log("Search Term:", searchTerm);
    onSearchChange(searchTerm); // Step 3: Call the search term handler
  };


  return (
    <Container
      maxWidth="md"
      sx={{ mt: 5, mx: "auto" }} // Center the container horizontally
    >
      <TextField
        id="search"
        type="search"
        label="Search"
        onChange={handleChange} // Update the search term on input change
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" }, // Adjust the widths as needed
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}
