import { Form, redirect } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();

  const newQuestion = {
    body: formData.get("body"),
    title: formData.get("title"),
    tagIds: [],
    userId: 1,
  };

  const response = await fetch("/api/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuestion),
  });

  const jsonData = await response.json();

  return redirect(`/questions/${jsonData.id}`);
}

export default function Ask() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Card>
        <AppBar color="inherit" elevation={0} sx={{ position: "relative" }}>
          <Toolbar>
            <Typography component="div" variant="h6">
              Ask a public question
            </Typography>
          </Toolbar>
        </AppBar>

        <CardContent>
          <Stack component={Form} id="new-question" method="post" spacing={2}>
            <TextField
              autoFocus
              helperText="Be specific and imagine you're asking a question to another person"
              label="Title"
              name="title"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              size="small"
            />
            <TextField
              helperText="Include all the information someone would need to answer your question"
              label="Body"
              multiline
              name="body"
              rows={4}
              size="small"
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button form="new-question" size="small" type="submit">
            Post your question
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
