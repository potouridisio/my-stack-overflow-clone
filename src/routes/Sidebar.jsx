import { Outlet, useMatches, useLoaderData } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

export async function loader() {
  const tags = await fetch("/api/tags");
  return tags;
}

export default function Sidebar() {
  const matches = useMatches();
  const match = matches[matches.length - 1];
  const tags = useLoaderData();

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
        <Box sx={{ overflow: "auto" }}>
          {match.handle.questionSidebar(tags)}
        </Box>
      </Drawer>
    </>
  );
}
