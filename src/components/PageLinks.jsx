import { Link, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PublicIcon from "@mui/icons-material/Public";

import { grey } from "@mui/material/colors";

export default function PageLinks({ onClick }) {
  const { pathname } = useLocation();
  const isRootPath = /^\/$/.test(pathname);
  const isQuestionsPath = /^\/questions\/.*$/.test(pathname);
  const isSearchPath = /^\/search(\/.*)?$/.test(pathname);

  return (
    <Box sx={{ overflow: "auto" }}>
      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "" : grey[800],
            }}
          >
            Public
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            selected={isQuestionsPath || isRootPath || isSearchPath}
            to="/"
            onClick={onClick}
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
            onClick={onClick}
          >
            <ListItemText inset primary="Tags" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            selected={pathname === "/users"}
            to="/users"
            onClick={onClick}
          >
            <ListItemText inset primary="Users" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
