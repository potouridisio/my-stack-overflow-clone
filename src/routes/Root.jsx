import { Link, Outlet, useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      navigate(`search?q=${event.target.value}`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
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

      <Outlet />
    </Box>
  );
}
