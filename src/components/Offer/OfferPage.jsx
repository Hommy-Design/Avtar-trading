import React from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, Paper } from '@mui/material';
import img1 from './st.webp'
import img2 from './tile.jpg'

const OfferPage = () => {
  return (

<div className="wrapper">
    <div className="flexColStart paddings innerWidth property-container" >  
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <img src={img1} alt="gdg" style={{height:'100%', width:'100%'}} />
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          textAlign: 'center',
          background: 'linear-gradient(to right, #ffcc00, #ff6600)',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4" style={{ color: '#fff' }}>
          Limited Time Offer: 50% OFF!
        </Typography>
      </Paper>

      {/* <img  alt="gdg" style={{height:'100%', width:'100%'}} /> */}
      <Card>
        <img
          src={img2} // Replace with your actual offer sale image
          alt="Offer Sale"
          style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Special Tile Offers
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore our high-quality tiles at amazing prices. Limited stock available!
          </Typography>
          <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Shop Now
          </Button>
        </CardContent>
      </Card>
    </Container>
    </div>
    </div>
  );
};

export default OfferPage;
