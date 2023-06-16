import { Outlet, useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

const drawerWidth = 240;

export default function Settings() {
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
          <List subheader={<ListSubheader>Personal information</ListSubheader>}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Edit profile" />
              </ListItemButton>
            </ListItem>
          </List>

          <List subheader={<ListSubheader>Site settings</ListSubheader>}>
            <ListItem disablePadding>
              <ListItemButton>
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
