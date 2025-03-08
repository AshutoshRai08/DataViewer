import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GridOnIcon from '@mui/icons-material/GridOn';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

const SideNav: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Stores', icon: <StoreIcon />, path: '/stores' },
    { text: 'SKUs', icon: <ShoppingCartIcon />, path: '/skus' },
    { text: 'Planning', icon: <GridOnIcon />, path: '/planning' },
    { text: 'Chart', icon: <BarChartIcon />, path: '/chart' },
  ];

  return (
    <>
      {/* Drawer (MUI Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={true} // Always open the drawer
        transitionDuration={{ enter: 300, exit: 200 }} // Smooth transitions
        PaperProps={{
          style: {
            width: 200,  // Sidebar width
            height: '100vh',  // Full height of the viewport
            top: 0,   // Align with the top
            left: 0,  // Align with the left
            position: 'fixed',  // Fix to the viewport
            borderBottomRightRadius: '15px', // Rounded bottom corner
            marginTop:64
          }
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideNav;
