import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export interface SearchResultItemProps {
  image: string;
  name: string;
  rating: string;
  destination: string;
  price: string;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ image, name, rating, destination, price }) => {
  return (
    <Card sx={{ display: 'flex', marginBottom: '20px', width: '60%' }}>
      <CardMedia
        component="img"
        sx={{ width: 160 }}
        image={image}
        alt={name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
            {Array.from({ length: parseInt(rating) }, (_, i) => (
              <StarIcon key={i} sx={{ color: '#FFD700' }} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ marginRight: '5px' }} />
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {destination}
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
          <Typography component="div" variant="h6">
            {price} /per person
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default SearchResultItem;
