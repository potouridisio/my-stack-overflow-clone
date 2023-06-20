import { Link, Outlet, useOutletContext } from "react-router-dom";

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
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <List
            subheader={
              <ListSubHeader sx={{ fontWeight: 700, pt: 3 }}>
                PERSONAL INFORMATION
              </ListSubHeader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={"edit"} style={{ textDecoration: "none" }}>
                  <ListItemText primary="Edit profile" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={"delete"} style={{ textDecoration: "none" }}>
                  <ListItemText primary="Delete profile" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>

          <List
            subheader={
              <ListSubHeader sx={{ fontWeight: 700 }}>
                EMAIL SETTINGS
              </ListSubHeader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={"email/settings"} style={{ textDecoration: "none" }}>
                  <ListItemText primary="Edit email settings" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  to={"tag-notifications"}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemText primary="Tag watching & ignoring" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={"email/digests"} style={{ textDecoration: "none" }}>
                  <ListItemText primary="Community digests" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  to={"https://stackexchange.com"}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemText primary="Question subscriptions" />
                  <LaunchIcon />
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
              <ListItemButton>
                <Link to={"preferences"} style={{ textDecoration: "none" }}>
                  {" "}
                  <ListItemText primary="Preferences" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={"JohnDoe/flair"} style={{ textDecoration: "none" }}>
                  <ListItemText primary="Flair" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={"hidecommunities"} style={{ textDecoration: "none" }}>
                  <ListItemText primary="Hide Communities" />
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
              <ListItemButton>
                <Link to={"my-collectives"} style={{ textDecoration: "none" }}>
                  <ListItemText primary="Your collectives" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={"mylogins"} style={{ textDecoration: "none" }}>
                  <ListItemText primary="Your logins" />
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
              <ListItemButton>
                <Link to={"apps"} style={{ textDecoration: "none" }}>
                  <ListItemText primary="Authorized applications" />
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
