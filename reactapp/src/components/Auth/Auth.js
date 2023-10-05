import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import './Auth.css'; // You can create this CSS file for styling

const LandingPage = () => {
  return (
    <Container className="landing-page" maxWidth="sm">
      <Typography variant="h3" component="h1" style={{ fontFamily: 'Poppins', textAlign: 'center',marginBottom: '10px', marginTop: '5%'}}>
        Welcome to vacServ
      </Typography>
      <Typography variant="subtitle1" component="p" style={{ fontFamily: 'Poppins', textAlign: 'center' }}>
        Your Vacuum Cleaner Service Provider
      </Typography>
      <div className="buttons-container" style={{ textAlign: 'center' }}>
        <Link to="/login" className="nav-link">
          <Button variant="contained" color="primary" className="login-button" style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Poppins', margin:"10px" }}>
            Login
          </Button>
        </Link>
        <Link to="/signUp" className="nav-link">
          <Button variant="contained" className="register-button" style={{ backgroundColor: 'black', fontFamily: 'Poppins' }}>
            Register
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default LandingPage;
