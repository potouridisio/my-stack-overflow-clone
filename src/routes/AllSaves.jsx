import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useNewListDialogStore } from "./Saves";

export default function AllSaves() {
  const setOpen = useNewListDialogStore((state) => state.setOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          All saves
        </Typography>

        <Button onClick={handleClickOpen} variant="contained">
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
