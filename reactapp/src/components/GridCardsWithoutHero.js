import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';


const defaultTheme = createTheme();

export default function GridCardsWithoutHero({ searchTerm, sortOrder, serviceCenters, userId}) {
  
  console.log("Search Term in GridCards:", searchTerm); 
  const handleCardClick = (serviceCenters) => {
    console.log("Clicked Card:", serviceCenters);
  };

  const filteredCards = serviceCenters.filter((center) =>
    center.serviceCenterName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCards = [...filteredCards].sort((a, b) => {
    const priceA = parseInt(a.price);
    const priceB = parseInt(b.price);

    if (sortOrder === 'ascending') {
      return priceA - priceB;
    } else if (sortOrder === 'descending') {
      return priceB - priceA;
    }

    return 0;
  });


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {sortedCards.map((serviceCenters) => (
            <Grid item key={serviceCenters.id} xs={12} sm={6} md={4}>
              <Link
                to={`/user/dashboard/${userId}/${serviceCenters.serviceCenterId}`} 
                state={{ cardData: serviceCenters }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  onClick={() => handleCardClick(serviceCenters)}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={serviceCenters.serviceCenterImageUrl}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {serviceCenters.serviceCenterName}
                    </Typography>
                    <Typography>
                      <strong>Description: </strong>{serviceCenters.serviceCenterDescription}
                    </Typography>
                    <Typography>
                      <strong>Address: </strong>{serviceCenters.serviceCenterAddress}
                    </Typography>
                    <Typography>
                      <strong>Phone Number: </strong>{serviceCenters.serviceCenterPhone}
                    </Typography>
                    <Typography>
                      <strong>Timing: </strong>{serviceCenters.serviceCenterTimings}
                    </Typography>
                    <Typography>
                      <strong>Price: </strong> Rs. {serviceCenters.serviceCenterPrice}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
