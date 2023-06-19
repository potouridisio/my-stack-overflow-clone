import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export default function HideCommunities() {
  return (
    <Box component="main" sx={{ p: 3, pt: 2 }}>
      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          Hide Communities
        </Typography>
      </Toolbar>
      <Toolbar disableGutters sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography sx={{ fontSize: 16 }}>
          Choose which communities will appear in the Communities and Top
          Network Posts sections of your profile. Hiding a community means other
          users will not see it in your Communities list or Top Network Posts.
          It does not, however, mean your activity is private. New sites that
          you join will be linked to your other communities by default.
        </Typography>
      </Toolbar>
    </Box>
  );
}
