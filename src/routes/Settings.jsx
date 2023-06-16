import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

const drawerWidth = 240;

export default function Settings() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
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
        <Box sx={{ overflow: "auto" }}>
          <List subheader={<ListSubheader>Site settings</ListSubheader>}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                selected={pathname === "/users/1/preferences"}
                to="/users/1/preferences"
              >
                <ListItemText primary="Preferences" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Outlet context={useOutletContext()} />
    </Box>
  );
}
