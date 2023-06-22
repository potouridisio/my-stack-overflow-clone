import { useLoaderData } from "react-router";

import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ params }) {
  return fetch(`/api/users/1/lists/${params.listId}`);
}

export default function List() {
  const list = useLoaderData();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          {list.name}
        </Typography>

        <Button startIcon={<EditIcon />} variant="outlined">
          Edit list
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
