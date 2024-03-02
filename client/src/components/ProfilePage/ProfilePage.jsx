import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  AppBar,
  Toolbar,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ProfileContent from './ProfileContent';
import AddressPage from './AdressPage/AddressPage';

const ProfilePage = () => {
  const [selectedContent, setSelectedContent] = useState('profile');

  const handleListItemClick = (content) => {
    setSelectedContent(content);
  };
    const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
  };

  const renderProfileContent = () => {
    switch (selectedContent) {
      case 'profile':
        return <div><ProfileContent/></div>;
      case 'orders':
        return <div>Orders Content</div>;
      case 'address':
        return <div><AddressPage/></div>;
      case 'changePassword':
        return <div>Change Password Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="wrapper">
    <div className="flexColStart paddings innerWidth property-container" >
    <Grid container spacing={2} style={{height:'100vh'}}>
      <Grid item xs={3}>
        <div elevation={3} style={{ padding: '16px' }}>
          <List>
            <ListItem button selected={selectedContent === 'profile'} onClick={() => handleListItemClick('profile')}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button selected={selectedContent === 'orders'} onClick={() => handleListItemClick('orders')}>
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button selected={selectedContent === 'address'} onClick={() => handleListItemClick('address')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Address" />
            </ListItem>
            <ListItem
              button
              selected={selectedContent === 'changePassword'}
              onClick={() => handleListItemClick('changePassword')}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Grid>
      <Grid item xs={9}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">{selectedContent}</Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '16px' }}>{renderProfileContent()}</div>
      </Grid>
    </Grid>
    </div>
    </div>
  );
};

export default ProfilePage;
