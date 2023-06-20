import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export default function UserCollectives() {
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
        <Typography variant="h6">Your Collectives</Typography>
        <Typography sx={{ fontSize: 16, m: 0 }}>
          The Collectives you have joined with your Stack Overflow account are
          listed here.
        </Typography>
      </Toolbar>
    </Box>
  );
}
