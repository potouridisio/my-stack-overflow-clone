import { Helmet } from "react-helmet";
import { Link, Outlet, useLocation } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

export default function Saves() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>Saves for John Doe - Stack Overflow Clone</title>
      </Helmet>

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
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  selected={pathname === "/users/1/saves"}
                  to="/users/1/saves"
                >
                  <ListItemText primary="All saves" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                secondaryAction={
                  <IconButton aria-label="add" edge="end" size="small">
                    <AddIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  secondary="My lists"
                  secondaryTypographyProps={{ fontWeight: "fontWeightMedium" }}
                />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Outlet />
      </Box>
    </>
  );
}
