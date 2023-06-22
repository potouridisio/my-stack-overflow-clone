import { Link, NavLink, Outlet, useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubHeader from "@mui/material/ListSubheader";

import LaunchIcon from "@mui/icons-material/Launch";

const drawerWidth = 240;

export default function Settings() {
  return (
    <Box sx={{ display: "flex", p: 0 }}>
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
          <List
            subheader={
              <ListSubHeader sx={{ fontWeight: 700, pt: 1 }}>
                PERSONAL INFORMATION
              </ListSubHeader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 1 }}>
                <Link to={"edit"} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Edit profile" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 0 }}>
                <Link to={"delete"} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Delete profile" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>

          <List
            subheader={
              <ListSubHeader sx={{ fontWeight: 700, pt: 0 }}>
                EMAIL SETTINGS
              </ListSubHeader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 1 }}>
                <Link to={"email/settings"} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Edit email settings" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 1 }}>
                <Link
                  to={"tag-notifications"}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemText
                    sx={{ m: 0 }}
                    secondary="Tag watching & ignoring"
                  />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 1 }}>
                <Link to={"email/digests"} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Community digests" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 0 }}>
                <Link
                  to={"https://stackexchange.com"}
                  style={{ textDecoration: "none" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <ListItemText
                      sx={{ m: 0, mr: 1 }}
                      secondary="Question subscriptions"
                    />
                    <LaunchIcon fontSize="x-small" sx={{ color: "grey" }} />
                  </Box>
                </Link>
              </ListItemButton>
            </ListItem>
          </List>

          <List
            subheader={
              <ListSubHeader sx={{ fontWeight: 700 }}>
                SITE SETTINGS
              </ListSubHeader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 1 }}>
                <Link to={"preferences"} style={{ textDecoration: "none" }}>
                  {" "}
                  <ListItemText sx={{ m: 0 }} secondary="Preferences" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 1 }}>
                <Link to={"JohnDoe/flair"} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Flair" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 0 }}>
                <Link to={"hidecommunities"} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Hide Communities" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>

          <List
            subheader={
              <ListSubHeader sx={{ fontWeight: 700 }}>ACCESS</ListSubHeader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 1 }}>
                <Link to={"my-collectives"} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Your collectives" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 0 }}>
                <Link to={"mylogins"} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Your logins" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>

          <List
            subheader={
              <ListSubHeader sx={{ fontWeight: 700 }}>API</ListSubHeader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 0, pb: 0 }}>
                <Link to={"apps"} style={{ textDecoration: "none" }}>
                  <ListItemText
                    sx={{ m: 0 }}
                    secondary="Authorized applications"
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Outlet context={useOutletContext()} />
    </Box>
  );
}
