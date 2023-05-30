import { Form, Link, useActionData, useLoaderData } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { convertToRelativeDate, indexBy } from "../lib/utils";

function validateAnswerBody(body) {
  if (!body) {
    return "Body is missing.";
  }

  if (body.length < 30) {
    return `Body must be at least 30 characters; you entered ${body.length}.`;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params, request }) {
  const formData = await request.formData();

  const newAnswer = {
    body: formData.get("body"),
    userId: 1,
  };

  const fieldErrors = {
    body: validateAnswerBody(newAnswer.body),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      fieldErrors,
    };
  }

  await fetch(`/api/questions/${params.questionId}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAnswer),
  }).then((res) => res.json());

  return {};
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const [question, tags, users, answers] = await Promise.all([
    fetch(`/api/questions/${params.questionId}`).then((res) => res.json()),
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
    fetch(`/api/questions/${params.questionId}/answers`).then((res) =>
      res.json()
    ),
  ]);

  return {
    question,
    tags: indexBy(tags, "id"),
    users: indexBy(users, "id"),
    answers,
  };
}

export default function Question() {
  const actionData = useActionData();
  const { question, tags, users, answers } = useLoaderData();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          {question.title}
        </Typography>
        <Button component={Link} to="/questions/ask" variant="contained">
          Ask Question
        </Button>
      </Toolbar>

      {/* Question */}
      <Card>
        <CardContent>
          <Typography color="text.secondary" sx={{ mb: 1.5 }}>
            {question.body}
          </Typography>

          <Stack direction="row" spacing={1}>
            {question.tagIds.map((tagId) => (
              <Chip key={tagId} label={tags[tagId].name} onClick={() => {}} />
            ))}
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Typography variant="body2">
            asked {convertToRelativeDate(question.createdAt)}{" "}
            {users[question.userId].name} {users[question.userId].reputation}
          </Typography>
        </CardActions>
      </Card>

      {answers.length > 0 ? (
        <>
          <Toolbar disableGutters>
            <Typography component="div" variant="h6">
              {answers.length} Answer{answers.length === 1 ? "" : "s"}
            </Typography>
          </Toolbar>

          <Stack spacing={2}>
            {answers.map((answer) => (
              <Card key={answer.id}>
                <CardContent>
                  <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                    {answer.body}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Typography variant="body2">
                    answered {convertToRelativeDate(answer.createdAt)}{" "}
                    {users[answer.userId].name}{" "}
                    {users[answer.userId].reputation}
                  </Typography>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </>
      ) : null}

      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          Your Answer
        </Typography>
      </Toolbar>

      <Card>
        <CardContent>
          <Form id="new-answer" method="post">
            <TextField
              error={actionData?.fieldErrors?.body}
              fullWidth
              helperText={actionData?.fieldErrors?.body}
              multiline
              name="body"
              rows={4}
            />
          </Form>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button form="new-answer" size="small" type="submit">
            Post Your Answer
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
