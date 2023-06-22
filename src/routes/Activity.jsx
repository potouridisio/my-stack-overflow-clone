import { Link, NavLink, Outlet, useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubHeader from "@mui/material/ListSubheader";

import LaunchIcon from "@mui/icons-material/Launch";

const drawerWidth = 160;

export default function Activity() {
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
        <Box sx={{ overflow: "auto", mt: 1 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Summary" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Answers" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Questions" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Tags" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Articles" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Badges" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  {" "}
                  <ListItemText sx={{ m: 0 }} secondary="Following" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Bounties" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Reputation" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="All actions" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Responses" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pt: 1, pb: 1 }}>
                <Link to={""} style={{ textDecoration: "none" }}>
                  <ListItemText sx={{ m: 0 }} secondary="Votes" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
