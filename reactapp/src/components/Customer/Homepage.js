import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import SearchBar from "../Searchbar";
import GridCard from "../GridCards";
import { Grid, Container, Button, TextField, MenuItem } from "@mui/material"; 
import Footer from "../Footer";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function HomePage() {
  const { userId} = useParams();
  console.log('User ID:', userId);
  // console.log('Service Center ID:' , serviceCenterId);
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
    fetch('http://localhost:8080/admin/service-center')
      .then((response) => response.json())
      .then((data) => {
        setServiceCenters(data); 
      })
      .catch((error) => {
        console.error('Error fetching service centers:', error);
      });
  }, []);

  return (
    <div>
      <Navbar userId={userId} />
       <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              style={{ marginTop: '13%' }} 
            >
              VacServ - your favorite Vacuum Cleaner Services!
            </Typography>
            <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary" 
            paragraph>
              Don't let dirt suck the life out of your home – call us for a breath of fresh air!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              style={{ marginBottom: '13%' }}
            >
              <Link to={`/user/dashboardGrid/${userId}`} className='nav-link'>
              <Button variant="contained" style={{ backgroundColor: 'black' }}>Go to Dashboard</Button>
              </Link>
              <Link to={`/user/appointment/${userId}`} className="nav-link">
              <Button variant="outlined" style={{ color: 'black', borderColor: 'black' }}>Go to Bookings</Button>
              </Link>
            </Stack>
          </Container>
        </Box>
      <SearchBar onSearchChange={handleSearchChange} />
      <Container maxWidth="sm" style={{ textAlign: "left", display: "flex", alignItems: "center"}}>
        {/* Center the elements */}
        <div style={{display: "inline", width:"100%"}}>
        <TextField
          select
          label="Sort Order By Price"
          variant="outlined"
          margin="normal"
          value={sortOrder}
          onChange={handleSortChange}
          style={{ width: "100%"}}
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
           style={{ marginLeft: "10px", fontWeight: "bolder", backgroundColor: 'black', borderColor: 'black' }} 
        >
          Filter
        </Button>
      </Container>
        <GridCard searchTerm={searchTerm} sortOrder={sortOrder} serviceCenters={serviceCenters} /> 
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
