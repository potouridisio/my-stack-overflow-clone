import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";

import { indexBy } from "../lib/utils";

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

function validateQuestionTags(tags) {
  if (tags.length === 0) {
    return "Please enter at least one tag.";
  }

  if (tags.length > 5) {
    return "Please enter no more than 5 tags.";
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();

  const tags = formData.get("tags");
  const newQuestion = {
    body: formData.get("body"),
    title: formData.get("title"),
    tagIds: tags !== "" ? tags.split`,`.map(Number) : [],
    userId: 1,
  };

  const fieldErrors = {
    body: validateQuestionBody(newQuestion.body),
    title: validateQuestionTitle(newQuestion.title),
    tags: validateQuestionTags(newQuestion.tagIds),
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

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const tagsResponse = await fetch("/api/tags").then((res) => res.json());

  return indexBy(tagsResponse.tags, "id");
}

export default function Ask() {
  const actionData = useActionData();
  const tags = useLoaderData();
  const navigation = useNavigation();
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <>
      <Helmet>
        <title>Ask a question - Stack Overflow Clone</title>
      </Helmet>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Card>
          <CardHeader
            title="Ask a public question"
            titleTypographyProps={{ variant: "h6" }}
          />

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

              <Autocomplete
                multiple
                onChange={(_event, value) => setSelectedTags(value)}
                options={Object.keys(tags)}
                getOptionLabel={(option) => tags[option].name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!actionData?.fieldErrors?.tags}
                    helperText={
                      actionData?.fieldErrors?.tags ||
                      "Add up to 5 tags to describe what your question is about"
                    }
                    label="Tags"
                    placeholder="e.g. (database ruby .net)"
                    variant="outlined"
                  />
                )}
                value={selectedTags}
              />

              <input name="tags" type="hidden" value={selectedTags.join()} />
            </Stack>
          </CardContent>

          <CardActions>
            <LoadingButton
              form="new-question"
              loading={navigation.state === "submitting"}
              size="small"
              type="submit"
            >
              Post your question
            </LoadingButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
