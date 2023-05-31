import { Outlet, useMatches } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

export default function Sidebar() {
  const matches = useMatches();
  const match = matches[matches.length - 1];

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
        <Box sx={{ overflow: "auto" }}>{match.handle.questionSidebar}</Box>
      </Drawer>
    </>
  );
}
