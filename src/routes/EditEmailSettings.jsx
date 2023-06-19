import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export default function EditEmailSettings() {
  return (
    <Box component="main" sx={{ p: 3, pt: 2 }}>
      <Toolbar disableGutters sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography component="div" variant="h6">
          Edit Email Settings
        </Typography>
      </Toolbar>
    </Box>
  );
}
