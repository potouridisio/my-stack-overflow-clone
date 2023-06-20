import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export default function UserLogins() {
  return (
    <Box component="main" sx={{ p: 3, pt: 2 }}>
      <Toolbar
        disableGutters
        sx={{
          borderBottom: 1,
          pt: 2,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6">My Logins</Typography>
        <Typography sx={{ fontSize: 16, m: 0, mb: 4 }}>
          Log in or sign up on any{" "}
          <Link
            to={"https://stackexchange.com/sites"}
            style={{ textDecoration: "none" }}
          >
            Stack Exchange
          </Link>{" "}
          site using these accounts
        </Typography>
      </Toolbar>

      <Button sx={{ mt: 8 }} variant="contained">
        Add more logins...
      </Button>
    </Box>
  );
}
