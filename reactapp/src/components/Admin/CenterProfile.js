import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import SearchBar from "../Searchbar";
import { Grid, Button, TextField, MenuItem } from "@mui/material";
import GridCardsWithoutHero from "../GridCardsWithoutHero";
import { Container } from "@mui/material";
import Footer from "../Footer";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import GridCardsAdmin from "./GridCardsAdmin";

function CenterProfile() {
  const params = useParams();
  console.log("Params:", params);
  const { userId } = params;
  console.log("User ID:", userId);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [serviceCenters, setServiceCenters] = useState([]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleFilterByLocation = () => {
    setSearchTerm(filterLocation);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    //fetch(`https://8080-beacfdbedeedadecdcbbcffffdccbe.premiumproject.examly.io/admin/service-center`)
    fetch(`http://localhost:8080/admin/service-center`)
      .then((response) => response.json())
      .then((data) => {
        setServiceCenters(data); // Update the state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching service centers:", error);
      });
  }, []);

  return (
    <div>
      <AdminNavBar />
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Center Profile
        </Typography>
        <SearchBar onSearchChange={handleSearchChange} />
        <Container
          maxWidth="sm"
          style={{ textAlign: "left", display: "flex", alignItems: "center" }}
        > 
          <div style={{ display: "inline", width: "100%" }}>
            <TextField
              select
              label="Sort Order By Price"
              variant="outlined"
              margin="normal"
              value={sortOrder}
              onChange={handleSortChange}
              style={{ width: "100%" }}
            >
              <MenuItem value="ascending">Ascending</MenuItem>
              <MenuItem value="descending">Descending</MenuItem>
            </TextField>
          </div>

          <TextField
            label="Filter by Location"
            variant="outlined"
            margin="normal"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            style={{ width: "100%", marginLeft: "15%" }} 
          />
          <Button
            variant="contained"
            onClick={handleFilterByLocation}
            style={{
              marginLeft: "10px",
              fontWeight: "bolder",
              backgroundColor: "black",
              borderColor: "black",
            }}
          >
            Filter
          </Button>
        </Container>
        <GridCardsAdmin
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          serviceCenters={serviceCenters}
          setServiceCenters={setServiceCenters}
        />{" "}
      </Container>
      <Footer />
    </div>
  );
}

export default CenterProfile;
