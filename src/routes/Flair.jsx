import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export default function Flair() {
  return (
    <Box component="main" sx={{ p: 3, pt: 2 }}>
      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          Flair
        </Typography>
      </Toolbar>
      <Toolbar disableGutters sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography sx={{ fontSize: 16 }}>
          What is it? It's a piece of valuable flair™ you can place on any
          website to show off your user profile!
        </Typography>
      </Toolbar>
    </Box>
  );
}
