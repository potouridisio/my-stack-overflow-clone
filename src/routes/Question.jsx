import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Form,
  Link as RouterLink,
  useActionData,
  useLoaderData,
} from "react-router-dom";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
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
  const intent = formData.get("intent");

  if (intent === "post-answer") {
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
    });
  }

  if (intent === "save-question") {
    const isSaved = formData.get("isSaved") === "true";

    const savedQuestion = await fetch(
      `/api/questions/${params.questionId}/save${
        isSaved ? "?isUndo=true" : ""
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: 1 }),
      }
    ).then((res) => res.json());

    return savedQuestion;
  }

  return {};
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const [question, tagsResponse, users, answers, savedQuestions] =
    await Promise.all([
      fetch(`/api/questions/${params.questionId}`).then((res) => res.json()),
      fetch("/api/tags").then((res) => res.json()),
      fetch("/api/users").then((res) => res.json()),
      fetch(`/api/questions/${params.questionId}/answers`).then((res) =>
        res.json()
      ),
      fetch("/api/users/1/savedQuestions").then((res) => res.json()),
    ]);

  return {
    question,
    tags: indexBy(tagsResponse.tags, "id"),
    users: indexBy(users, "id"),
    answers,
    isSaved: savedQuestions.some(
      (savedQuestion) => savedQuestion.id == params.questionId
    ),
  };
}

export default function Question() {
  const actionData = useActionData();
  const {
    question,
    tags,
    users,
    answers,
    isSaved: initialIsSaved,
  } = useLoaderData();
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (actionData?.message) {
      enqueueSnackbar(actionData.message, { variant: "success" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <>
      <Helmet>
        <title>{`${question.title} - Stack Overflow Clone`}</title>
      </Helmet>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Toolbar disableGutters>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            {question.title}
          </Typography>
          <Button
            component={RouterLink}
            to="/questions/ask"
            variant="contained"
          >
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

          <CardActions>
            <Form method="post">
              <input name="isSaved" type="hidden" value={initialIsSaved} />
              <Tooltip title={`${isSaved ? "Unsave" : "Save"} this question.`}>
                <IconButton
                  name="intent"
                  onClick={() => setIsSaved(!isSaved)}
                  type="submit"
                  value="save-question"
                >
                  {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
              </Tooltip>
            </Form>

            <Typography sx={{ ml: "auto" }} variant="body2">
              asked {convertToRelativeDate(question.createdAt)}{" "}
              <Link href="#" onClick={(event) => event.preventDefault()}>
                {users[question.userId].name}
              </Link>{" "}
              {users[question.userId].reputation}
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
                      <Link
                        href="#"
                        onClick={(event) => event.preventDefault()}
                      >
                        {users[answer.userId].name}
                      </Link>{" "}
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
                error={!!actionData?.fieldErrors?.body}
                fullWidth
                helperText={actionData?.fieldErrors?.body}
                multiline
                name="body"
                rows={4}
              />
            </Form>
          </CardContent>

          <CardActions>
            <Button
              form="new-answer"
              name="intent"
              size="small"
              type="submit"
              value="post-answer"
            >
              Post Your Answer
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
