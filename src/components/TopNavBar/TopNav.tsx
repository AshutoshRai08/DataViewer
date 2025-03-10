import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { ReactComponent as Logo}  from "../../../src/assets/logogsyn.svg"; // Uncomment this line
import  Logo  from "../../../src/assets/logogsyn.svg"; // Uncomment this line

const TopNav: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("Credentials");
    navigate('/login');
  };

  return (
    <AppBar sx={{ width: '100%', backgroundColor: "#fff", boxShadow: "none", color: "#000" }}>
      <Toolbar sx={{ width: '100%', padding: 0, display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        {/* <Logo width={50} height={50} />  */}
        
        {/* <img src={Logo} alt="" />
         */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ width: 80, height: 80 }} />
        </Box>
        {/* Centered Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          Data Viewer
        </Typography>

        {/* Logout Button */}
        {user && (
          <Button color="inherit" onClick={handleLogout} sx={{ marginRight: 5 }}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;