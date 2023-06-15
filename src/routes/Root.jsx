import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import PageLinks from "../components/PageLinks";

export function loader() {
  return fetch("/api/users/1/preferences");
}

const Search = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  marginRight: theme.spacing(2),
  position: "relative",
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  padding: theme.spacing(0, 2),
  pointerEvents: "none",
  position: "absolute",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  color: "inherit",
}));

export default function Root() {
  const userPreferences = useLoaderData();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      navigate(`search?q=${event.target.value}`);
    }
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {userPreferences.hideLeftNavigation && !Boolean(anchorEl) ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                size="large"
                sx={{ mr: 2 }}
                onClick={handlePopoverOpen}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : userPreferences.hideLeftNavigation && Boolean(anchorEl) ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                size="large"
                sx={{ mr: 2 }}
                onClick={handlePopoverClose}
              >
                <CloseIcon />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
              >
                <PageLinks onClick={handlePopoverClose} />
              </Popover>
            </>
          ) : (
            ""
          )}

          <Typography
            component="div"
            noWrap
            onClick={() => navigate("/")}
            role="button"
            sx={{ cursor: "pointer" }}
            tabIndex={0}
            variant="h6"
          >
            Stack Overflow Clone
          </Typography>

          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputProps={{ "aria-label": "search" }}
              onKeyDown={handleKeyDown}
              placeholder="Search…"
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton component={Link} sx={{ p: 0 }} to="users/1/preferences">
            <Avatar>JD</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Outlet context={userPreferences} />
    </Box>
  );
}
