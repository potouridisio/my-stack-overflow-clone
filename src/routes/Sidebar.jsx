import { Fragment } from "react";
import { Outlet, useMatches } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 320;

export default function Sidebar() {
  const matches = useMatches();

  console.log({ matches });

  const sidebar = matches
    // first get rid of any matches that don't have handle and sidebar
    .filter((match) => Boolean(match.handle?.sidebar))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match, index) => (
      <Fragment key={index}>{match.handle.sidebar(match.data)}</Fragment>
    ));

  return (
    <>
      <Outlet />

      {/* Sidebar */}
      <Drawer
        anchor="right"
        PaperProps={{ sx: { position: "relative" } }}
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

        <Box sx={{ overflow: "auto" }}>{sidebar}</Box>
      </Drawer>
    </>
  );
}
