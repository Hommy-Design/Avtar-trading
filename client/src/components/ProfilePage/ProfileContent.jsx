import React from 'react'
import {
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Avatar,
    AppBar,
    Toolbar,
  } from '@mui/material';
  
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    // Add more user details as needed
  };

const ProfileContent = () => {
  return (
    <div>
        <div>
          <Avatar alt={user.name} src="/path/to/profile-image.jpg" style={{ width: '100px', height: '100px' }} />
          <Typography variant="h6" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {user.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Phone Number: {user.phoneNumber}
          </Typography>
          <button onClick={() => handleUpdateProfile()}>Update</button>
        </div>
    </div>
  )
}

export default ProfileContent