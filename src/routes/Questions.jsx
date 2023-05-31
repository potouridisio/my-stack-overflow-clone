import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { convertToRelativeDate, indexBy, truncateText } from "../lib/utils";
import { FormatBold } from "@mui/icons-material";
import {
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Radio,
} from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");

  const [questions, tags, users] = await Promise.all([
    fetch(`/api/questions${searchTerm ? `?q=${searchTerm}` : ""}`).then((res) =>
      res.json()
    ),
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return {
    questions,
    tags: indexBy(tags, "id"),
    users: indexBy(users, "id"),
  };
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export const handle = {
  questionSidebar: (
    <>
      <Card>
        <CardHeader title="The Overflow Blog" />
        <CardContent>
          <Button>
            More on our AI future: building course recommendations and a new
            data platform
          </Button>
          <Button>
            This product could help build a more equitable workplace (Ep. 575)
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Related Tags" />
        <CardContent>
          <Button variant="contained">Javascript</Button>
        </CardContent>
      </Card>
    </>
  ),
};

export default function Questions() {
  const { questions, tags, users } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const isSearch = Boolean(q);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          {isSearch ? "Search Results" : "All Questions"}
        </Typography>

        <Button component={Link} to="/questions/ask" variant="contained">
          Ask Question
        </Button>
      </Toolbar>

      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="subtitle1">
          {questions.length} {isSearch ? "result" : "question"}
          {questions.length === 1 ? "" : "s"}
        </Typography>

        {!isSearch ? (
          <ToggleButton
            size="small"
            value="filter"
            onClick={() => setShowFilterOptions(!showFilterOptions)}
          >
            <FilterListIcon fontSize="small" sx={{ mr: 0.5 }} />
            Filter
          </ToggleButton>
        ) : null}
      </Toolbar>

      {showFilterOptions ? (
        <Card
          sx={{
            backgroundColor: "#f1f2f3",
            border: 1,
            borderColor: "grey.400",
            mb: 4,
          }}
        >
          <CardContent>
            <Form
              id="filterChoices"
              sx={{ display: "flex", gap: 20, mb: 0.8 }}
              method="POST"
            >
              <FormControl component="fieldset" variant="standard">
                <FormLabel
                  component="legend"
                  sx={{ color: "black", fontWeight: 500, mb: 2 }}
                >
                  Filter by
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="No answers" />}
                    label="No answers"
                  />
                  <FormControlLabel
                    control={<Checkbox name="No accepted answer" />}
                    label="No accepted answer"
                  />
                  <FormControlLabel
                    control={<Checkbox name="Has bounty" />}
                    label="Has bounty"
                  />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" variant="standard">
                <FormLabel
                  component="legend"
                  sx={{ color: "black", fontWeight: 500, mb: 2 }}
                >
                  Sorted by
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Radio name="Newest" />}
                    label="Newest"
                  />
                  <FormControlLabel
                    control={<Radio name="Recent activity" />}
                    label="Recent activity"
                  />
                  <FormControlLabel
                    control={<Radio name="Highest score" />}
                    label="Highest score"
                  />
                  <FormControlLabel
                    control={<Radio name="Most frequent" />}
                    label="Most frequent"
                  />
                  <FormControlLabel
                    control={<Radio name="Bounty ending soon" />}
                    label="Bounty ending soon"
                  />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" variant="standard">
                <FormLabel
                  component="legend"
                  sx={{ color: "black", fontWeight: 500, mb: 2 }}
                >
                  Tagged with
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Radio name="My watched tags" />}
                    label="My watched tags"
                  />
                  <FormControlLabel
                    control={<Radio name="The following tags" />}
                    label="The following tags:"
                  />
                </FormGroup>
                <Input
                  sx={{
                    border: 1,
                    borderColor: "grey.500",
                    borderRadius: "5%",
                    ml: 4,
                    mt: 2,
                    p: 0.5,
                    pr: 8,
                  }}
                  placeholder="e.g. Javascript or Python"
                ></Input>
              </FormControl>
            </Form>
          </CardContent>

          <CardActions sx={{ borderTop: 1, borderColor: "grey.400", p: 2 }}>
            <Button
              form="filterChoices"
              size="medium"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              type="submit"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`filter`);
              }}
            >
              Apply Filter
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button size="small">Cancel</Button>
          </CardActions>
        </Card>
      ) : null}

      <Stack spacing={2}>
        {/* Question */}
        {questions.map((question) => (
          <Card key={question.id}>
            <CardActionArea component={Link} to={`/questions/${question.id}`}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: 14 }}
                >
                  {question.voteCount} vote
                  {question.voteCount === 1 ? "" : "s"}
                  {bull}
                  {question.answerCount} answer
                  {question.answerCount === 1 ? "" : "s"}
                </Typography>

                <Typography component="div" variant="h5">
                  {question.title}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  {truncateText(question.body, 200)}
                </Typography>

                <Stack direction="row" spacing={1}>
                  {question.tagIds.map((tagId) => (
                    <Chip
                      key={tagId}
                      label={tags[tagId].name}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </CardActionArea>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Typography variant="body2">
                {users[question.userId].name}{" "}
                {users[question.userId].reputation} asked{" "}
                {convertToRelativeDate(question.createdAt)}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
