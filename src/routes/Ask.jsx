import { Form, redirect, useActionData } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function validateQuestionBody(body) {
  if (!body) {
    return "Body is missing.";
  }

  if (body.length < 30) {
    return `Body must be at least 30 characters; you entered ${body.length}.`;
  }
}

function validateQuestionTitle(title) {
  if (!title) {
    return "Title is missing.";
  }

  if (title.length < 15) {
    return "Title must be at least 15 characters.";
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();

  const newQuestion = {
    body: formData.get("body"),
    title: formData.get("title"),
    tagIds: [],
    userId: 1,
  };

  const fieldErrors = {
    body: validateQuestionBody(newQuestion.body),
    title: validateQuestionTitle(newQuestion.title),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      fieldErrors,
    };
  }

  const question = await fetch("/api/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuestion),
  }).then((res) => res.json());

  return redirect(`/questions/${question.id}`);
}

export default function Ask() {
  const actionData = useActionData();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Card>
        <Toolbar>
          <Typography component="div" variant="h6">
            Ask a public question
          </Typography>
        </Toolbar>

        <CardContent>
          <Stack component={Form} id="new-question" method="post" spacing={2}>
            <TextField
              autoFocus
              error={!!actionData?.fieldErrors?.title}
              helperText={
                actionData?.fieldErrors?.title ||
                "Be specific and imagine you're asking a question to another person"
              }
              label="Title"
              name="title"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />

            <TextField
              error={!!actionData?.fieldErrors?.body}
              helperText={
                actionData?.fieldErrors?.body ||
                "Include all the information someone would need to answer your question"
              }
              label="Body"
              multiline
              name="body"
              rows={4}
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
