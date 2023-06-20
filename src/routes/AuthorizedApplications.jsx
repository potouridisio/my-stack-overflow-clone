import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export default function AuthorizedApplications() {
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
        <Typography variant="h6">Applications</Typography>
        <Typography sx={{ fontSize: 16, m: 0, mb: 4 }}>
          What is this? The applications you have authorized with your Stack
          Exchange account are listed here. Remove an application to remove
          access to your information.
        </Typography>
      </Toolbar>
    </Box>
  );
}
