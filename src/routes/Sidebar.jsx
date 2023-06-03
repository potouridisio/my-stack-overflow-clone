import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 320;

export default function Sidebar() {
  return (
    <>
      <Outlet />

      {/* Sidebar */}
      <Drawer
        anchor="right"
        sx={{
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          flexShrink: 0,
          width: drawerWidth,
        }}
        variant="permanent"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }} />
      </Drawer>
    </>
  );
}
