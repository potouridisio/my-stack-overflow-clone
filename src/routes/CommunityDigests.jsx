import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

import LaunchIcon from "@mui/icons-material/Launch";

import { grey } from "@mui/material/colors";

export default function CommunityDigests() {
  return (
    <Box component="main" sx={{ p: 3, pt: 2, flexGrow: 0.75 }}>
      <Toolbar disableGutters sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography component="div" variant="h6">
          Community Digests
        </Typography>
      </Toolbar>

      <Card>
        <CardContent sx={{ border: 1 }}>
          <Box
            sx={{
              p: 4,
              mt: 4,
              display: "flex",
              flexDirection: "column",
              bgColor: (theme) =>
                theme.palette.mode === "light" ? "#f8f9f9" : grey[900],
            }}
          >
            <Typography sx={{ fontSize: 16, flexGrow: 1, textAlign: "center" }}>
              You haven’t subscribed to any community digests.
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 4 }}
            >
              <Button sx={{ border: 1 }}>
                {" "}
                Subscribe to the Stack Overflow community digest{" "}
              </Button>
              <Button sx={{ border: 1 }}>
                {" "}
                Browse other community digests <LaunchIcon />{" "}
              </Button>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ border: 1 }}>
          <Toolbar
            sx={{ display: "flex", p: 2, alignItems: "center", flexGrow: 1 }}
            disableGutters
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                Stop sending me community digests
              </Typography>
              <Typography>
                We want to keep in touch, but only in ways that you find
                helpful.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexGrow: 1,
              }}
            >
              <Button sx={{ textTransform: "none" }} variant="outlined">
                Unsubscribe from all
              </Button>
            </Box>
          </Toolbar>
        </CardActions>
      </Card>
    </Box>
  );
}
