import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

import PublicIcon from "@mui/icons-material/Public";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

export default function LeftSidebar() {
  const { pathname } = useLocation();
  const isRootPath = /^\/$/.test(pathname);
  const isQuestionsPath = /^\/questions\/.*$/.test(pathname);
  const isSearchPath = /^\/search(\/.*)?$/.test(pathname);
  const userPreferences = useOutletContext();

  return (
    <>
      {/* Sidebar */}
      {userPreferences.hideLeftNavigation ? null : (
        <Drawer
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
            <List subheader={<ListSubheader>Public</ListSubheader>}>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  selected={isQuestionsPath || isRootPath || isSearchPath}
                  to="/"
                >
                  <ListItemIcon>
                    <PublicIcon />
                  </ListItemIcon>
                  <ListItemText primary="Questions" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  selected={pathname === "/tags"}
                  to="/tags"
                >
                  <ListItemText inset primary="Tags" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  selected={pathname === "/users"}
                  to="/users"
                >
                  <ListItemText inset primary="Users" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}

      {/* Main */}
      <Outlet context={userPreferences} />
    </>
  );
}
