import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function AllSaves() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          All saves
        </Typography>

        <Button component={Link} to="/users/1/saves" variant="contained">
          Create new list
        </Button>
      </Toolbar>

      <Toolbar disableGutters>
        <Typography component="div" variant="subtitle1">
          0 saved items
        </Typography>
      </Toolbar>
    </Box>
  );
}
