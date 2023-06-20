import { Helmet } from "react-helmet";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function EditUser() {
  return (
    <>
      <Helmet>
        <title>User - John Doe - Edit - Stack Overflow Clone</title>
      </Helmet>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar disableGutters>
          <Typography component="div" variant="h6">
            Edit your profile
          </Typography>
        </Toolbar>

        <Card>
          <CardHeader title="Public information" />

          <CardContent>
            <Stack component="form" spacing={2}>
              <TextField autoFocus label="Name" name="name" />

              <TextField label="Location" name="location" />
            </Stack>
          </CardContent>

          <CardActions>
            <Button size="small">Save profile</Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
