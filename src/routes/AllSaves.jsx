import { Link as RouterLink, useLoaderData } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { convertToRelativeDate, indexBy } from "../lib/utils";
import { useNewListDialogStore } from "./Saves";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const [savedQuestions, tagsResponse, users] = await Promise.all([
    fetch("/api/users/1/savedQuestions").then((res) => res.json()),
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return {
    savedQuestions,
    tags: indexBy(tagsResponse.tags, "id"),
    users: indexBy(users, "id"),
  };
}

export default function AllSaves() {
  const { savedQuestions, tags, users } = useLoaderData();
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
          {savedQuestions.length} saved items
        </Typography>
      </Toolbar>

      <Stack spacing={2}>
        {savedQuestions.map((savedQuestion) => (
          <Card key={savedQuestion.id}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              disableTypography
              subheader={
                <Link
                  component={RouterLink}
                  sx={{ display: "block" }}
                  to={`/questions/${savedQuestion.id}`}
                  variant="h5"
                >
                  {savedQuestion.title}
                </Link>
              }
              title={
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", mb: 1.5 }}
                >
                  <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                    {savedQuestion.voteCount} vote
                    {savedQuestion.voteCount === 1 ? "" : "s"}
                  </Typography>
                  {savedQuestion.answerCount > 0 ? (
                    <Chip
                      color="success"
                      label={`${savedQuestion.answerCount} answer${
                        savedQuestion.answerCount === 1 ? "" : "s"
                      }`}
                      variant="outlined"
                    />
                  ) : (
                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                      {savedQuestion.answerCount} answer
                      {savedQuestion.answerCount === 1 ? "" : "s"}
                    </Typography>
                  )}
                </Stack>
              }
            />
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
                {savedQuestion.tagIds.map((tagId) => (
                  <Chip
                    key={tagId}
                    label={tags[tagId].name}
                    onClick={() => {}}
                  />
                ))}
              </Stack>
              <Typography variant="body2">
                <Link href="#" onClick={(event) => event.preventDefault()}>
                  {users[savedQuestion.userId].name}
                </Link>{" "}
                {users[savedQuestion.userId].reputation} asked{" "}
                {convertToRelativeDate(savedQuestion.createdAt)}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
