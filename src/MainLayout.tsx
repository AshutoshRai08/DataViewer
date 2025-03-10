import { ReactNode } from "react";
import { Box } from "@mui/material";
import TopNav from "./components/TopNavBar/TopNav";
import SideNav from "./components/SideNav/SideNav";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <SideNav />
      <TopNav />
      <Box
        sx={{
          marginLeft: 20, 
        padding: 2, 
          minHeight: '100vh',
          borderTop: "2px solid #B2BEB5	",
          marginTop:10,
          backgroundColor:"#D3D3D3"
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default MainLayout;
